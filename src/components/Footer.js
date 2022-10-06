import React from 'react';
import { SocialIcon } from 'react-social-icons';
import {
  MDBFooter,
  MDBContainer,
} from 'mdb-react-ui-kit';

 function Footer() {
  return (
    <footer className='foot_er'>
    <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <button className='btn  btn-floating m-1'><SocialIcon url="https://facebook.com/jaketrent"/></button>

          <button className='btn  btn-floating m-1'><SocialIcon url="https://discord.com/jaketrent"/></button>

          <button className='btn  btn-floating m-1'><SocialIcon url="https://google.com/jaketrent"/></button>

          <button className='btn  btn-floating m-1'><SocialIcon url="https://instagram.com/lakshaymeghlan"/></button>

          <button className='btn  btn-floating m-1'><SocialIcon url="https://twitter.com/Lakshay_meghlan"/></button>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        ©2022 Copyright:
        <p>SHOP</p>
      </div>
    </MDBFooter>
    </footer>
  );
}

export default Footer