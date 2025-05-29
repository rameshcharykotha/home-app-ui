import React, { useState, useEffect } from 'react';
import DebtService from '../../services/DebtService';
import CreateDebt from './CreateDebt';
import UpdateDebt from './UpdateDebt';
import './DebtList.css';

const DebtList = () => {
    const [debts, setDebts] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentDebt, setCurrentDebt] = useState(null);

    useEffect(() => {
        DebtService.getAllDebts().then((response) => {
            setDebts(response.data);
        });
    }, []);

    const deleteDebt = (id) => {
        DebtService.deleteDebt(id).then(() => {
            setDebts(debts.filter(debt => debt.id !== id));
        });
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const openUpdateModal = (debt) => {
        setCurrentDebt(debt);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentDebt(null);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="main-content">
            <div className="header-container">
                <h2 className="component-heading">Debt List</h2>
                <button className="add-debt-button" onClick={openCreateModal}>Add Debt</button>
            </div>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeCreateModal}>&times;</span>
                        <CreateDebt closeModal={closeCreateModal} />
                    </div>
                </div>
            )}
            {showUpdateModal && currentDebt && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeUpdateModal}>&times;</span>
                        <UpdateDebt debt={currentDebt} closeModal={closeUpdateModal} />
                    </div>
                </div>
            )}
            <table className="debt-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Creditor</th>
                        <th>Amount</th>
                        <th>Interest Rate</th>
                        <th>Due Date</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {debts.map(debt => (
                        <tr key={debt.id}>
                            <td>{debt.id}</td>
                            <td>{formatDate(debt.date)}</td>
                            <td>{debt.creditor}</td>
                            <td>{debt.amount}</td>
                            <td>{debt.interestRate}</td>
                            <td>{debt.dueDate ? formatDate(debt.dueDate) : ''}</td>
                            <td>{debt.notes}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteDebt(debt.id)}>Delete</button>
                                <button className="update-button" onClick={() => openUpdateModal(debt)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DebtList;