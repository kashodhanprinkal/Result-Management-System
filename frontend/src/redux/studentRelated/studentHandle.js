import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

// Reusable function for making API requests
const apiRequest = async (dispatch, url, method = 'GET', data = null, successAction, failedAction, headers = {}) => {
    dispatch(getRequest());

    try {
        const config = {
            method,
            url,
            ...(data && { data }),
            headers: { 'Content-Type': 'application/json', ...headers }
        };
        
        const result = await axios(config);

        if (result.data.message) {
            dispatch(failedAction(result.data.message));
        } else {
            dispatch(successAction(result.data));
        }
    } catch (error) {
        if (error.response) {
            dispatch(getError(error.response.data.message || "An error occurred"));
        } else if (error.request) {
            dispatch(getError("Network error: No response received"));
        } else {
            dispatch(getError("Error: " + error.message));
        }
    }
};

// Fetch all students
export const getAllStudents = (id) => (dispatch) => {
    if (!id) {
        console.error("Error: Missing student ID in getAllStudents");
        return;
    }

    const url = `${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/Students/${id}`;
    apiRequest(dispatch, url, 'GET', null, getSuccess, getFailed);
};

// Update student fields
export const updateStudentFields = (id, fields, address) => (dispatch) => {
    if (!id || !address) {
        console.error("Error: Missing ID or address in updateStudentFields");
        return;
    }

    const url = `${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/${address}/${id}`;
    apiRequest(dispatch, url, 'PUT', fields, stuffDone, getFailed);
};

// Remove a student (or related data)
export const removeStuff = (id, address) => (dispatch) => {
    if (!id || !address) {
        console.error("Error: Missing ID or address in removeStuff");
        return;
    }

    const url = `${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/${address}/${id}`;
    apiRequest(dispatch, url, 'DELETE', null, stuffDone, getFailed);
};
