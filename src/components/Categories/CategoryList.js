import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/CategoryService';
import CreateCategory from './CreateCategory';
import UpdateCategory from './UpdateCategory';
import './CategoryList.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        });
    }, []);

    const deleteCategory = (id) => {
        CategoryService.deleteCategory(id).then(() => {
            setCategories(categories.filter(category => category.id !== id));
        });
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const openUpdateModal = (category) => {
        setCurrentCategory(category);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentCategory(null);
    };

    return (
        <div className="main-content">
            <div className="header-container">
                <h2 className="component-heading">Category List</h2>
                <button className="add-category-button" onClick={openCreateModal}>Add Category</button>
            </div>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeCreateModal}>&times;</span>
                        <CreateCategory closeModal={closeCreateModal} />
                    </div>
                </div>
            )}
            {showUpdateModal && currentCategory && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeUpdateModal}>&times;</span>
                        <UpdateCategory category={currentCategory} closeModal={closeUpdateModal} />
                    </div>
                </div>
            )}
            <table className="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteCategory(category.id)}>Delete</button>
                                <button className="update-button" onClick={() => openUpdateModal(category)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;