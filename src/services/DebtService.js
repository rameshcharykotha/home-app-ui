import axios from 'axios';

const API_URL = 'http://localhost:8080/api/debts';

class DebtService {
    getAllDebts() {
        return axios.get(API_URL);
    }

    createDebt(debt) {
        return axios.post(API_URL, debt);
    }

    getDebtById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    updateDebt(id, debt) {
        return axios.put(`${API_URL}/${id}`, debt);
    }

    deleteDebt(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

const debtService = new DebtService();
export default debtService;