import React, { useState, useEffect } from 'react';
import ExpenseService from '../../services/ExpenseService';
import CreateExpense from './CreateExpense';
import './ExpenseList.css';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        ExpenseService.getAllExpenses().then((response) => {
            setExpenses(response.data);
        }).catch(error => {
            console.error("There was an error fetching the expenses!", error);
        });
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="expense-list-container">
            <h2 className="component-heading">Expenses List</h2>
            <button className="add-expense-button" onClick={openModal}>Add Expense</button>
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Payment Method</th>
                        <th>Store</th>
                        <th>Notes</th>
                        <th>Recurring</th>
                        <th>Recurrence Interval</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{formatDate(expense.date)}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category ? expense.category.name : 'N/A'}</td>
                            <td>{expense.paymentMethod}</td>
                            <td>{expense.store}</td>
                            <td>{expense.notes}</td>
                            <td>{expense.isRecurring ? 'Yes' : 'No'}</td>
                            <td>{expense.recurrenceInterval}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <CreateExpense closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;