// npm modules
import bcrypt from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";

//schema
import UserSchema from "../Schema/userDetails";
// constants
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const register = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log("encrypted Password", encryptedPassword);
  try {
    const oldUser = await UserSchema.findOne({ email });

    if (oldUser) {
      console.log("user exist", oldUser);
      return res.json({ error: "User Exists" });
    }
    console.log("existing user not found creating new");
    const newUser = await UserSchema.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });

    console.log("new user created");
    return res.send({ status: "user created", newUser });
  } catch (error) {
    console.log("error found while creating a new user", error);
    return res.send({ status: "error", error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};

const getUser = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // console.log(user);

    const useremail = user.email;
    UserSchema.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
};

export default { register, login, getUser };
