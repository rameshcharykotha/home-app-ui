import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';
import './UpdateCategory.css';

const UpdateCategory = ({ category, closeModal }) => {
    const [name, setName] = useState(category.name);

    const updateCategory = (e) => {
        e.preventDefault();
        const updatedCategory = { ...category, name };
        CategoryService.updateCategory(category.id, updatedCategory).then(() => {
            closeModal();
            window.location.reload(); // Reload the page to see the updated category in the list
        });
    };

    return (
        <div className="update-category-container">
            <h2 className="component-heading">Update Category</h2>
            <form onSubmit={updateCategory}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="save-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateCategory;