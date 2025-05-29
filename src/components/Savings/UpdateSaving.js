import React, { useState, useEffect } from 'react';
import SavingsService from '../../services/SavingsService';
import CategoryService from '../../services/CategoryService';
import './UpdateSaving.css';

const UpdateSaving = ({ saving, closeModal }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(formatDate(saving.date));
    const [amount, setAmount] = useState(saving.amount);
    const [category, setCategory] = useState(saving.category ? saving.category.id : '');
    const [notes, setNotes] = useState(saving.notes);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error("There was an error fetching the categories!", error);
        });
    }, []);

    const updateSaving = (e) => {
        e.preventDefault();
        if (!date || !amount || !category) {
            alert("Date, Amount, and Category are required");
            return;
        }
        const updatedSaving = { ...saving, date, amount, category: { id: category }, notes };
        SavingsService.updateSaving(saving.id, updatedSaving).then(() => {
            closeModal();
            window.location.reload(); // Reload the page to see the updated saving in the list
        }).catch(error => {
            console.error("There was an error updating the saving!", error);
        });
    };

    return (
        <div className="update-saving-container">
            <h2 className="component-heading">Update Saving</h2>
            <form onSubmit={updateSaving}>
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
                <button type="submit" className="save-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateSaving;