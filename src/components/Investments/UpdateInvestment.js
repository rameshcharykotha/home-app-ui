import React, { useState, useEffect } from 'react';
import InvestmentService from '../../services/InvestmentService';
import CategoryService from '../../services/CategoryService';
import './UpdateInvestment.css';

const UpdateInvestment = ({ investment, closeModal }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(formatDate(investment.date));
    const [investmentType, setInvestmentType] = useState(investment.investmentType);
    const [amount, setAmount] = useState(investment.amount);
    const [category, setCategory] = useState(investment.category.id);
    const [notes, setNotes] = useState(investment.notes);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error("There was an error fetching the categories!", error);
        });
    }, []);

    const updateInvestment = (e) => {
        e.preventDefault();
        if (!date || !investmentType || !category) {
            alert("Date, Investment Type, and Category are required");
            return;
        }
        const updatedInvestment = { ...investment, date, investmentType, amount, category: { id: category }, notes };
        InvestmentService.updateInvestment(investment.id, updatedInvestment).then(() => {
            closeModal();
            window.location.reload(); // Reload the page to see the updated investment in the list
        }).catch(error => {
            console.error("There was an error updating the investment!", error);
        });
    };

    return (
        <div className="update-investment-container">
            <h2 className="component-heading">Update Investment</h2>
            <form onSubmit={updateInvestment}>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Investment Type:</label>
                    <select
                        value={investmentType}
                        onChange={(e) => setInvestmentType(e.target.value)}
                        required
                    >
                        <option value="">Select Investment Type</option>
                        <option value="Stock">Stock</option>
                        <option value="Mutual Fund">Mutual Fund</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Notes:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <button type="submit" className="save-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateInvestment;