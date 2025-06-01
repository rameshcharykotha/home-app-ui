import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Using NavLink for active styling

// Optional: Add some basic styling
// import './Navigation.css'; // Create this file if you add styles

const Navigation = () => {
    const navStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '220px', // Fixed width for the sidebar
        backgroundColor: '#f0f0f0',
        height: '100vh', // Full viewport height
        position: 'fixed', // Fixed sidebar
        overflow: 'auto', // Scrollable if content overflows
        paddingTop: '20px',
        borderRight: '1px solid #ccc' // Added a border for visual separation
    };

    const linkStyle = {
        display: 'block',
        color: 'black',
        padding: '10px 18px', // Increased padding
        textDecoration: 'none',
        fontSize: '16px' // Slightly larger font
    };

    // NavLink's isActive prop will be used for styling, so we define an active style
    const activeStyle = {
        backgroundColor: '#007bff', // Example active background color
        color: 'white', // Example active text color
        fontWeight: 'bold'
    };

    // Style for the NavLink itself, merging base style and active style if active
    const getNavLinkStyle = ({ isActive }) => {
        return isActive ? { ...linkStyle, ...activeStyle } : linkStyle;
    };

    return (
        <nav style={{ width: navStyle.width }}> {/* Wrapper div to occupy space for the fixed nav */}
            <ul style={navStyle}>
                <li><NavLink to="/" style={getNavLinkStyle}>Home</NavLink></li>
                <li><NavLink to="/categories" style={getNavLinkStyle}>Categories</NavLink></li>
                <li><NavLink to="/debts" style={getNavLinkStyle}>Debts</NavLink></li>
                <li><NavLink to="/expenses" style={getNavLinkStyle}>Expenses</NavLink></li>
                <li><NavLink to="/investments" style={getNavLinkStyle}>Investments</NavLink></li>
                <li><NavLink to="/savings" style={getNavLinkStyle}>Savings</NavLink></li>
                <li><NavLink to="/events" style={getNavLinkStyle}>Events</NavLink></li>
                {/* Add other links as they appear in App.js if necessary */}
            </ul>
        </nav>
    );
};
export default Navigation;
