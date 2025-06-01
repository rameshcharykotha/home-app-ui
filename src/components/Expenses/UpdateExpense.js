import React, { useState, useEffect } from 'react';
import ExpenseService from '../../services/ExpenseService';
import CategoryService from '../../services/CategoryService';
import './UpdateExpense.css';

const UpdateExpense = ({ expense, closeModal }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(formatDate(expense.date));
    const [category, setCategory] = useState(expense.category.id);
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);
    const [notes, setNotes] = useState(expense.notes);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error("There was an error fetching the categories!", error);
        });
    }, []);

    const updateExpense = (e) => {
        e.preventDefault();
        if (!date || !description) {
            alert("Date and Description are required");
            return;
        }
        const updatedExpense = { ...expense, date, category: { id: category }, amount, description, notes };
        ExpenseService.updateExpense(expense.id, updatedExpense).then(() => {
            closeModal();
            window.location.reload(); // Reload the page to see the updated expense in the list
        }).catch(error => {
            console.error("There was an error updating the expense!", error);
        });
    };

    return (
        <div className="update-expense-container">
            <h2 className="component-heading">Update Expense</h2>
            <form onSubmit={updateExpense}>
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
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
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

export default UpdateExpense;