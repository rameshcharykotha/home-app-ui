import React, { useState, useEffect } from 'react';
import InvestmentService from '../../services/InvestmentService';
import CreateInvestment from './CreateInvestment';
import UpdateInvestment from './UpdateInvestment';
import './InvestmentList.css';

const InvestmentList = () => {
    const [investments, setInvestments] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentInvestment, setCurrentInvestment] = useState(null);

    useEffect(() => {
        InvestmentService.getAllInvestments().then((response) => {
            setInvestments(response.data);
        }).catch(error => {
            console.error("There was an error fetching the investments!", error);
        });
    }, []);

    const deleteInvestment = (id) => {
        InvestmentService.deleteInvestment(id).then(() => {
            setInvestments(investments.filter(investment => investment.id !== id));
        }).catch(error => {
            console.error("There was an error deleting the investment!", error);
        });
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const openUpdateModal = (investment) => {
        setCurrentInvestment(investment);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentInvestment(null);
    };

    return (
        <div className="main-content">
            <div className="header-container">
                <h2 className="component-heading">Investment List</h2>
                <button className="add-investment-button" onClick={openCreateModal}>Add Investment</button>
            </div>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeCreateModal}>&times;</span>
                        <CreateInvestment closeModal={closeCreateModal} />
                    </div>
                </div>
            )}
            {showUpdateModal && currentInvestment && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeUpdateModal}>&times;</span>
                        <UpdateInvestment investment={currentInvestment} closeModal={closeUpdateModal} />
                    </div>
                </div>
            )}
            <table className="investment-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map(investment => (
                        <tr key={investment.id}>
                            <td>{investment.id}</td>
                            <td>{new Date(investment.date).toLocaleDateString()}</td>
                            <td>{investment.investmentType}</td>
                            <td>{investment.amount}</td>
                            <td>{investment.category.name}</td>
                            <td>{investment.notes}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteInvestment(investment.id)}>Delete</button>
                                <button className="update-button" onClick={() => openUpdateModal(investment)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvestmentList;