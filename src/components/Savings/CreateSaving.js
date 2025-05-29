import React, { useState, useEffect } from 'react';
import SavingsService from '../../services/SavingsService';
import CategoryService from '../../services/CategoryService';
import './CreateSaving.css';

const CreateSaving = ({ closeModal }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error("There was an error fetching the categories!", error);
        });
    }, []);

    const saveSaving = (e) => {
        e.preventDefault();
        if (!date || !amount || !category) {
            alert("Date, Amount, and Category are required");
            return;
        }
        const saving = { date, amount, category: { id: category }, notes };
        SavingsService.createSaving(saving).then(() => {
            closeModal();
            window.location.reload(); // Reload the page to see the new saving in the list
        }).catch(error => {
            console.error("There was an error creating the saving!", error);
        });
    };

    return (
        <div className="create-saving-container">
            <h2 className="component-heading">Add Saving</h2>
            <form onSubmit={saveSaving}>
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
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

export default CreateSaving;