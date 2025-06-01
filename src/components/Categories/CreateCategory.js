import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';
import './CreateCategory.css';

const CreateCategory = ({ closeModal }) => {
    const [name, setName] = useState('');

    const saveCategory = (e) => {
        e.preventDefault();
        const category = { name };
        CategoryService.createCategory(category).then(() => {
            closeModal();
            window.location.reload(); // Reload the page to see the new category in the list
        });
    };

    return (
        <div className="create-category-container">
            <h2 className="component-heading">Add Category</h2>
            <form onSubmit={saveCategory}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

export default CreateCategory;