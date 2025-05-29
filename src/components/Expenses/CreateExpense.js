import React, { useState, useEffect } from 'react';
import ExpenseService from '../../services/ExpenseService';
import CategoryService from '../../services/CategoryService';
import './CreateExpense.css';

const CreateExpense = ({ closeModal }) => {
    const [mode, setMode] = useState('manual');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error("There was an error fetching the categories!", error);
        });
    }, []);

    const saveExpense = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'manual') {
                if (!date || !amount || !category) {
                    alert("Date, Amount, and Category are required");
                    return;
                }
                const expense = { date, amount, category: { id: category }, notes };
                await ExpenseService.createExpense(expense);
            } else if (mode === 'receipt') {
                if (!receipt) {
                    alert("Receipt is required");
                    return;
                }
                await ExpenseService.uploadReceipt(receipt);
            }
            closeModal();
            window.location.reload(); // Reload the page to see the new expense in the list
        } catch (error) {
            console.error("There was an error saving the expense!", error);
        }
    };

    return (
        <div className="create-expense-container">
            <h2 className="component-heading">Add Expense</h2>
            <div className="mode-selector">
                <label>
                    <input
                        type="radio"
                        value="manual"
                        checked={mode === 'manual'}
                        onChange={() => setMode('manual')}
                    />
                    Enter Data Manually
                </label>
                <label>
                    <input
                        type="radio"
                        value="receipt"
                        checked={mode === 'receipt'}
                        onChange={() => setMode('receipt')}
                    />
                    Upload Receipt
                </label>
            </div>
            <form onSubmit={saveExpense}>
                {mode === 'manual' && (
                    <>
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
                                {categories && categories.map(cat => (
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
                    </>
                )}
                {mode === 'receipt' && (
                    <div className="form-group">
                        <label>Upload Receipt:</label>
                        <input
                            type="file"
                            onChange={(e) => setReceipt(e.target.files[0])}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateExpense;