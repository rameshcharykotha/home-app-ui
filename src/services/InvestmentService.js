import axios from 'axios';

const INVESTMENT_API_BASE_URL = "http://localhost:8080/api/investments";

class InvestmentService {
    getAllInvestments() {
        return axios.get(INVESTMENT_API_BASE_URL);
    }

    createInvestment(investment) {
        return axios.post(INVESTMENT_API_BASE_URL, investment);
    }

    getInvestmentById(investmentId) {
        return axios.get(`${INVESTMENT_API_BASE_URL}/${investmentId}`);
    }

    updateInvestment(investmentId, investment) {
        return axios.put(`${INVESTMENT_API_BASE_URL}/${investmentId}`, investment);
    }

    deleteInvestment(investmentId) {
        return axios.delete(`${INVESTMENT_API_BASE_URL}/${investmentId}`);
    }
}

export default new InvestmentService();