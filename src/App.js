import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import DebtList from './components/Debts/DebtList';
import CreateDebt from './components/Debts/CreateDebt';
import UpdateDebt from './components/Debts/UpdateDebt';
import CategoryList from './components/Categories/CategoryList';
import CreateCategory from './components/Categories/CreateCategory';
import UpdateCategory from './components/Categories/UpdateCategory';
import ExpenseList from './components/Expenses/ExpenseList';
import CreateExpense from './components/Expenses/CreateExpense';
import UpdateExpense from './components/Expenses/UpdateExpense';
import InvestmentList from './components/Investments/InvestmentList';
import CreateInvestment from './components/Investments/CreateInvestment';
import UpdateInvestment from './components/Investments/UpdateInvestment';
import SavingsList from './components/Savings/SavingsList';
import CreateSaving from './components/Savings/CreateSaving';
import UpdateSaving from './components/Savings/UpdateSaving';
import './App.css';

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <div style={{ display: 'flex', flex: '1', marginTop: '60px' }}>
                    <Navigation />
                    <div style={{ marginLeft: '240px', padding: '20px', flex: '1', zIndex: '1' }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/categories" element={<CategoryList />} />
                            <Route path="/create-category" element={<CreateCategory />} />
                            <Route path="/update-category/:id" element={<UpdateCategory />} />
                            <Route path="/debts" element={<DebtList />} />
                            <Route path="/create-debt" element={<CreateDebt />} />
                            <Route path="/update-debt/:id" element={<UpdateDebt />} />
                            <Route path="/expenses" element={<ExpenseList />} />
                            <Route path="/create-expense" element={<CreateExpense />} />
                            <Route path="/update-expense/:id" element={<UpdateExpense />} />
                            <Route path="/investments" element={<InvestmentList />} />
                            <Route path="/create-investment" element={<CreateInvestment />} />
                            <Route path="/update-investment/:id" element={<UpdateInvestment />} />
                            <Route path="/savings" element={<SavingsList />} />
                            <Route path="/create-saving" element={<CreateSaving />} />
                            <Route path="/update-saving/:id" element={<UpdateSaving />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;