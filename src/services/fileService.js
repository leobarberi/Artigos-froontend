import axios from 'axios';

const API_URL = 'http://localhost:8080/artigo';

const getAllFiles = () => {
    return axios.get(API_URL);
};

const getFileById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createFile = (file) => {
    const formData = new FormData();
    formData.append('file', file.file);
    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const updateFile = (id, file) => {
    return axios.put(`${API_URL}/${id}`, file);
};

const deleteFile = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const downloadFile = (id) => {
    return axios.get(`${API_URL}/${id}/download`, {
        responseType: 'blob'
    });
};

export default {
    getAllFiles,
    getFileById,
    createFile,
    updateFile,
    deleteFile,
    downloadFile
};