import axios from 'axios';

const SAVINGS_API_BASE_URL = "http://localhost:8080/api/savings";

class SavingsService {
    getAllSavings() {
        return axios.get(SAVINGS_API_BASE_URL);
    }

    createSaving(saving) {
        return axios.post(SAVINGS_API_BASE_URL, saving);
    }

    getSavingById(savingId) {
        return axios.get(`${SAVINGS_API_BASE_URL}/${savingId}`);
    }

    updateSaving(savingId, saving) {
        return axios.put(`${SAVINGS_API_BASE_URL}/${savingId}`, saving);
    }

    deleteSaving(savingId) {
        return axios.delete(`${SAVINGS_API_BASE_URL}/${savingId}`);
    }
}

export default new SavingsService();