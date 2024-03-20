import React, { useState } from 'react';

function FAQs() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        {
            question: 'What benefits does this app offer?',
            answer: "Experience the ease of tracking and visualizing your loan or debt progress with Repay Smart. Our app is designed to provide you with a seamless and effortless way to stay on top of your financial obligations."
        },
        {
            question: 'What sets Repay Smart apart from other apps?',
            answer: "Unlike most apps, Repay Smart offers a comprehensive view of your loan progression from the moment it's issued until it's fully paid off. We empower you with the tools to stay informed about your future repayments and take control of your financial journey."
        },
        {
            question: 'Why should I use Repay Smart when I have a Credit Score app?',
            answer: "While credit score apps provide a broad overview of your accounts, they often lack detailed information about your loans. They might show your loan balance, but not the specifics like monthly repayments, annual interest, or payment dates. Repay Smart fills this gap with a simple, focused solution - track your loan repayments with minimal effort. Gain a deeper understanding of your current financial status and confidently plan for a debt-free future."
        }        
    ];

    return (
        <section className="container m-4 p-6 rounded-lg px-24 my-20">
            <div className="images flex justify-between">
                <span className="icon text-2xl">❓</span>
                <span className="icon text-2xl">❓</span>
            </div>
            <article className="text-center text-cyan-800 mb-4 animate__animated animate__fadeIn">
                <h2 className="font-bold text-2xl mb-4">Frequently Asked Questions</h2>
                <p>Have questions? Explore our Frequently Asked Questions section for quick answers to your immediate queries. If your question isn't answered, feel free to reach out via the contact form listed below or on our contact page and we'll respond as soon as we can.</p>
             </article>
            {questions.map((item, index) => (
                <div key={index} className={`dropdown animate__animated animate__slideIn${index % 2 === 0 ? 'Left' : 'Right'}`}>                
                <button onClick={() => toggleOpen(index)} className={`toggle-btn ${openIndex === index ? 'open' : ''}`}>{item.question}</button>
                    {openIndex === index && (
                        <div className="content open">
                            <p>{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}

export default FAQs;
