import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved by Abhishek.</div>
      <div>
        <a
          href="https://github.com/exclusiveabhi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://leetcode.com/u/exclusiveabhi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LeetCode"
        >
          <SiLeetcode />
        </a>
        <a
          href="https://www.linkedin.com/in/abhishek-rajput-/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/exclusiveabhi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <RiInstagramFill />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
