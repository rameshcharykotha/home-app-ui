import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li><NavLink to="/categories" activeClassName="active">Categories</NavLink></li>
                <li><NavLink to="/debts" activeClassName="active">Debts</NavLink></li>
                <li><NavLink to="/expenses" activeClassName="active">Expenses</NavLink></li>
                <li><NavLink to="/investments" activeClassName="active">Investments</NavLink></li>
                <li><NavLink to="/savings" activeClassName="active">Savings</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;