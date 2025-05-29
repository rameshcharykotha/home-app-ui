import axios from 'axios';

const EXPENSE_API_BASE_URL = "http://localhost:8080/api/expenses";

class ExpenseService {
    getAllExpenses() {
        return axios.get(EXPENSE_API_BASE_URL);
    }

    createExpense(expense) {
        return axios.post(EXPENSE_API_BASE_URL, expense);
    }

    getExpenseById(expenseId) {
        return axios.get(`${EXPENSE_API_BASE_URL}/${expenseId}`);
    }

    updateExpense(expenseId, expense) {
        return axios.put(`${EXPENSE_API_BASE_URL}/${expenseId}`, expense);
    }

    deleteExpense(expenseId) {
        return axios.delete(`${EXPENSE_API_BASE_URL}/${expenseId}`);
    }

    uploadReceipt(file) {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post(`${EXPENSE_API_BASE_URL}/upload-receipt`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new ExpenseService();