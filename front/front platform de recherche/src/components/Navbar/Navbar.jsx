import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import logo1 from  '../../assets/logo11.png';

const Navbar = () => {
  return (
    <nav className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-10   flex justify-between items-center"
      >
        {/* Logo section */}
        <div>
        <img src={logo1} alt="Logo" className="w-30 h-40" />
        </div>
       
        
      </motion.div>
    </nav>
  );
};

export default Navbar;
