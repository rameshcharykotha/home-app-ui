import React, { useState, useEffect } from 'react';
import SavingsService from '../../services/SavingsService';
import CreateSaving from './CreateSaving';
import UpdateSaving from './UpdateSaving';
import './SavingsList.css';

const SavingsList = () => {
    const [savings, setSavings] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentSaving, setCurrentSaving] = useState(null);

    useEffect(() => {
        SavingsService.getAllSavings().then((response) => {
            setSavings(response.data);
        }).catch(error => {
            console.error("There was an error fetching the savings!", error);
        });
    }, []);

    const deleteSaving = (id) => {
        SavingsService.deleteSaving(id).then(() => {
            setSavings(savings.filter(saving => saving.id !== id));
        }).catch(error => {
            console.error("There was an error deleting the saving!", error);
        });
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const openUpdateModal = (saving) => {
        setCurrentSaving(saving);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentSaving(null);
    };

    return (
        <div className="main-content">
            <div className="header-container">
                <h2 className="component-heading">Savings List</h2>
                <button className="add-saving-button" onClick={openCreateModal}>Add Saving</button>
            </div>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeCreateModal}>&times;</span>
                        <CreateSaving closeModal={closeCreateModal} />
                    </div>
                </div>
            )}
            {showUpdateModal && currentSaving && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeUpdateModal}>&times;</span>
                        <UpdateSaving saving={currentSaving} closeModal={closeUpdateModal} />
                    </div>
                </div>
            )}
            <table className="saving-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {savings.map(saving => (
                        <tr key={saving.id}>
                            <td>{saving.id}</td>
                            <td>{new Date(saving.date).toLocaleDateString()}</td>
                            <td>{saving.amount}</td>
                            <td>{saving.category ? saving.category.name : 'N/A'}</td>
                            <td>{saving.notes}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteSaving(saving.id)}>Delete</button>
                                <button className="update-button" onClick={() => openUpdateModal(saving)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SavingsList;