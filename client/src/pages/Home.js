import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import React, { useEffect, useRef } from 'react';
import Loading from "../components/Loading";

export default function Home() {
    const observerRef = useRef(null);
    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show")
                } 
            })
        })

        const hiddenElements = document.querySelectorAll(".hidden")
        hiddenElements.forEach((el) => observer.observe(el))
    }, []);

    return (
        <div>
            <Loading/>
            <Navbar isNavbar={true} />
            <div className="hidden"><Hero /> </div>
            <Events options={{ eventLimit: 8, allEvents: false, allBtn: true }} />
            <Gallery />
            <Footer />

        </div>
    );
}
