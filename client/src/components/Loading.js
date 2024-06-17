import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Loading(props) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const updateCounter = () => {
            const delay = Math.floor(Math.random() * 10) + 50;
            setTimeout(() => {
                if (counter < 100) {
                    setCounter(prevCounter => prevCounter + 1);
                }
            }, delay);
        };
        

        const startLoader = () => {
            updateCounter();
        };

        startLoader();

    }, [counter]);

    useEffect(() => {
        if (counter === 20) {
            gsap.to("overlay", {
                display:"none",
            })

            gsap.to(".loader", {
                duration: 0.5,
                opacity: 0
            });

            gsap.to(".counter", {
                duration: 0.5,
                opacity: 0,
            });

            gsap.to(".bar", {
                duration: 1.5,
                height: 0,
                display: "none",
                stagger: {
                    amount: 0.5,
                },
                ease: "power4.inOut",
            });
        }
    }, [counter]);

    return (
        <>
            <div className="loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
                <div className="bar6"></div>
            </div>
            <div className="overlay">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="bar"></div>
                ))}
            </div>
            {/* <div className="counter">{counter}</div> */}
        </>
    );
}
