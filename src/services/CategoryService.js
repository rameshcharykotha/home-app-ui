import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/categories";

class CategoryService {
    getAllCategories() {
        return axios.get(CATEGORY_API_BASE_URL);
    }

    createCategory(category) {
        return axios.post(CATEGORY_API_BASE_URL, category);
    }

    getCategoryById(categoryId) {
        return axios.get(`${CATEGORY_API_BASE_URL}/${categoryId}`);
    }

    updateCategory(categoryId, category) {
        return axios.put(`${CATEGORY_API_BASE_URL}/${categoryId}`, category);
    }

    deleteCategory(categoryId) {
        return axios.delete(`${CATEGORY_API_BASE_URL}/${categoryId}`);
    }
}

export default new CategoryService();