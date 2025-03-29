'use client'
import React from 'react';
import "../styles/Services.css"
import { TbAffiliate } from "react-icons/tb";
import {IoColorWandOutline} from "react-icons/io5"
import {BiCodeAlt} from "react-icons/bi"
import { motion } from "framer-motion";
import { PiAppleLogoLight } from "react-icons/pi";
import { FaDigitalOcean } from "react-icons/fa";
const Services = () => {

   const fade = {
    opacity: 1,
    transition:{
        duration: 1.4
    }
   }

  return (
      <>
          <div className="services" id='services'>
        
              <div className="container">
              <motion.div 
  whileInView={fade} 
  viewport={{ once: true }} 
  initial={{ opacity: 0 }} 
  className="heading flex justify-center items-center text-center"
>
  <h2 className="text-2xl font-semibold mb-6 relative inline-block before:content-[''] before:w-16 before:h-1 before:bg-purple-500 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2">
    Services
  </h2>
</motion.div>

                <motion.div className="services-box" whileInView={fade} initial={{opacity: 0}}>
                    <div className="services-card">
                        <BiCodeAlt className='services-icon' />
                        <p className='services-title'>Web Development</p>
                        <p className='services-desc'>We use various web technologies to develop attractive,creative, interactive, responsive and functional website layouts. </p>
                    </div>
                        <div className="services-card">
                        <PiAppleLogoLight className='services-icon' />
                            <p className='services-title'>App Development </p>
                            <p className='services-desc'>We create high-fidelity designs and prototypes, ensuring accessibility and usability. I also specialize in app development, building user-friendly and high-performance applications to boost business growth</p>
                        </div>
                </motion.div>
               
              </div>
          </div>
      </>
  )
};

export default Services;
