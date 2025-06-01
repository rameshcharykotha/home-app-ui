import React from 'react';
import './HomePage.css';

const quotations = [
    "A penny saved is a penny earned.",
    "Do not save what is left after spending, but spend what is left after saving.",
    "The art is not in making money, but in keeping it.",
    "Wealth consists not in having great possessions, but in having few wants.",
    "The best way to save money is not to lose it.",
    "Beware of little expenses; a small leak will sink a great ship.",
    "The more you learn, the more you earn.",
    "An investment in knowledge pays the best interest."
];

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Kotha Family Financial App</h1>
            <h2>Ramesh, Swapna, Akhil, and Ayaan</h2>
            <div className="quotations">
                {quotations.map((quote, index) => (
                    <div key={index} className="quote">
                        {quote}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;