import React from 'react';
import FormHero from '../assets/pngwing.com.png';

function ContactSection() {
    return (
        <section className="contact flex items-stretch p-8">
            <div className="left flex-1 p-6">
                <article className="dark:text-white">
                    <h2 className="font-bold text-2xl text-slate-800 mb-4">Talk to me</h2>
                    <p className="text-xl text-slate-700">Contact me anytime if you have any questions, concerns, or requests.</p>
                </article>
                <figure>
                    <img src={FormHero} alt="finance management illustration" />
                </figure>
            </div>
            <section className="right flex-1">
                <div className="relative sm:max-w-xl sm:mx-auto">
                    <form className="form-group relative p-8 bg-white shadow rounded-3xl">
                        <header className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Contact Me</h2>
                            <p className="text-sm text-gray-500 font-normal leading-relaxed">Reach me on these platforms.</p>
                        </header>
                        <ul className="divide-y divide-gray-200 mt-4">
                            <li className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <label className="block leading-loose">LinkedIn</label>
                                <a href="https://www.linkedin.com/in/motlalepula-sello-37956813a/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 mt-2 flex items-center justify-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 sm:mt-0">
                                    <i className="fab fa-linkedin mr-2"></i>
                                    LinkedIn Profile
                                </a>
                            </li>
                            <li className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <label className="block leading-loose">Twitter</label>
                                <a href="https://twitter.com/MotlalepulaSel6" target="_blank" rel="noopener noreferrer" className="px-4 py-2 mt-2 flex items-center justify-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 sm:mt-0">
                                    <i className="fab fa-twitter mr-2"></i>
                                    Twitter Profile
                                </a>                                        
                            </li>
                            <li className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <label className="block leading-loose">GitHub</label>
                                <a href="https://github.com/Motlakz" target="_blank" rel="noopener noreferrer" className="px-4 py-2 mt-2 flex items-center justify-center text-white bg-purple-400 rounded-lg hover:bg-purple-800 sm:mt-0">
                                    <i className="fab fa-github mr-2"></i>
                                    GitHub Profile
                                </a>
                            </li>
                            <li className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <label className="block leading-loose0">Email</label>
                                <a href="mailto:motlalepulasello5@gmail.com" className="px-4 py-2 mt-2 flex items-center justify-center text-white bg-red-500 rounded-lg hover:bg-red-600 sm:mt-0">
                                    <i className="fas fa-envelope mr-2"></i>
                                    Send Email
                                </a>                                        
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        </section>
    )
}

export default ContactSection;
