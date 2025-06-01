import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DebtService from '../../services/DebtService';
import './CreateDebt.css';

const CreateDebt = ({ closeModal }) => {
    const [date, setDate] = useState('');
    const [creditor, setCreditor] = useState('');
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    const saveDebt = (e) => {
        e.preventDefault();
        const debt = { date, creditor, amount, interestRate, dueDate, notes };
        DebtService.createDebt(debt).then(() => {
            closeModal();
            navigate('/debts');
        });
    };

    return (
        <div className="create-debt-container">
            <h2 className="component-heading">Add Debt</h2>
            <form onSubmit={saveDebt}>
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
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

export default CreateDebt;