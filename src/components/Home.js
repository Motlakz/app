import React from 'react' 
import Header from './Header'
import AppDemo from './AppDemo';
import FAQs from './FAQ';
import ContactSection from './Contact';

function Home() {
    return(
        <>
            <Header />
            <AppDemo />
            <FAQs />
            <ContactSection />
        </>
    )
}

export default Home;
