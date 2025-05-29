import React, { useState } from 'react';
import DebtService from '../../services/DebtService';
import './UpdateDebt.css';

const UpdateDebt = ({ debt, closeModal }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(formatDate(debt.date));
    const [creditor, setCreditor] = useState(debt.creditor);
    const [amount, setAmount] = useState(debt.amount);
    const [interestRate, setInterestRate] = useState(debt.interestRate);
    const [dueDate, setDueDate] = useState(debt.dueDate ? formatDate(debt.dueDate) : '');
    const [notes, setNotes] = useState(debt.notes);

    const updateDebt = (e) => {
        e.preventDefault();
        const updatedDebt = { ...debt, date, creditor, amount, interestRate, dueDate, notes };
        DebtService.updateDebt(debt.id, updatedDebt).then(() => {
            closeModal();
        });
    };

    return (
        <div className="update-debt-container">
            <h2 className="component-heading">Update Debt</h2>
            <form onSubmit={updateDebt}>
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
                    <label>Creditor:</label>
                    <input
                        type="text"
                        value={creditor}
                        onChange={(e) => setCreditor(e.target.value)}
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
                    <label>Interest Rate:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
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

export default UpdateDebt;