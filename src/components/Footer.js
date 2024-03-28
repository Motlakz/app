import React from "react";
import logo from '../repay-smart-logo-secondary.jpeg';
import TwitterLogo from '../assets/twitter.svg';
import LinkedInLogo from '../assets/linkedin.svg';
import GitHubLogo from '../assets/github.svg';
import { Link } from "react-router-dom";

function Footer() {
    return(
        <footer className="w-full bg-indigo-900 flex items-center justify-between p-2">
            <div className="socials flex gap-4 p-2 rounded-md bg-blue-50 text-medium">
                <span className="icon">
                    <Link to="https://twitter.com/MotlalepulaSel6">
                        <img src={TwitterLogo} className="w-4 h-4" alt="Twitter logo" />
                    </Link>
                </span>
                <span className="icon">
                    <Link to="https://www.linkedin.com/in/motlalepula-sello-37956813a/">
                        <img src={LinkedInLogo} className="w-4 h-4" alt="LinkedIn logo" />
                    </Link>
                </span>
                <span className="icon">
                    <Link to="https://github.com/Motlakz">
                        <img src={GitHubLogo} className="w-4 h-4" alt="GitHub logo" />
                    </Link>
                </span>
            </div>
            <p className="copyright text-sm flex flex-col text-center text-blue-100">
                <span>&copy; 2023 - 2024</span> RepaySmart. All Rights Reserved
            </p>
            <img src={logo} alt="repay smart logo" className='rounded-full max-w-10 max-h-10 mr-3' />
        </footer>
    )
}

export default Footer;
