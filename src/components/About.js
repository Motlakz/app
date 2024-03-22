import React from "react";
import FinancePlan from '../assets/financial-planning.jpg';
import FinanceImg from '../assets/finance-manage-illustration.jpg';
import Manage from '../assets/management-finance-business-financial-plan-financial-statement-accounting-removebg-preview.png';
import FinancialAsset from '../assets/png-transparent-financial-management-finance-accounting-organization-financial-management-service-people-business-removebg-preview.png';

function About() {
    return (
        <div className="about-page bg-cover bg-no-repeat px-6 flex flex-col items-center gap-6 min-h-screen">
            <section className="text-cyan-700 bg-indigo-300 bg-opacity-20 rounded-2xl p-10 my-20 flex flex-col items-center justify-between gap-10">
                <article className="text-center pb-10 text-xl">
                    <div className="images relative flex justify-between">
                        <figure>
                            <img src={FinanceImg} className="max-w-24 -rotate-45 w-full" alt="finance pic" />
                        </figure>
                        <figure>
                            <img src={Manage} className="max-w-24 w-full" alt="finance plan pic" />
                        </figure>
                    </div>
                    <h2 className="text-3xl mb-10">About Repay Smart</h2>
                    <p className="mb-6">Repay Smart is an innovative financial management platform designed to empower users with the tools they need to manage their loan repayments effectively.</p>
                    <p> At its core, Repay Smart features a user-friendly form that captures essential loan information, such as loan type, current amount, monthly deduction, deduction date, and annual interest rate. This intuitive interface simplifies the process of entering and updating loan details, making it accessible for everyone, regardless of their financial literacy level. By consolidating all loan-related data in one place, Repay Smart acts as a centralized hub for users to oversee their financial obligations with ease.</p>
                    <div className="images relative flex justify-between">
                        <figure>
                            <img src={FinancialAsset} className="max-w-24 w-full" alt="finance plan pic" />
                        </figure>
                        <figure>
                            <img src={FinancePlan} className="rotate-45 max-w-24 w-full" alt="finance pic" />
                        </figure>
                    </div>
                </article>
            </section>
        </div>
    )
}

export default About;
