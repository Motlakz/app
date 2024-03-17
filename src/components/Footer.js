import React from "react";
import logo from '../repay-smart-logo-secondary.jpeg';
import TwitterLogo from '../assets/twitter.svg';
import LinkedInLogo from '../assets/linkedin.svg';
import GitHubLogo from '../assets/github.svg';

function Footer() {
    return(
        <footer className="w-full bg-indigo-900 flex items-center justify-between p-2">
            <div className="socials flex gap-4 p-2 rounded-md bg-blue-50 text-medium">
                <span className="icon">
                    <img src={TwitterLogo} className="w-4 h-4" alt="Twitter logo" />
                </span>
                <span className="icon">
                    <img src={LinkedInLogo} className="w-4 h-4" alt="LinkedIn logo" />
                </span>
                <span className="icon">
                    <img src={GitHubLogo} className="w-4 h-4" alt="GitHub logo" />
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
