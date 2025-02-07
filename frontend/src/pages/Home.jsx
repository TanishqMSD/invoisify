import React from "react";
import { useSpring, animated } from "react-spring";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

AOS.init();

const Home = () => {

  return (
    <div className="">
      <Navbar activePage="Home"/>
      <HeroSection/>
      <Features/>
      <Footer/>
    </div>
  );
};

export default Home;
