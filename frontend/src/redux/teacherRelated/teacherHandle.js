import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

// Reusable function for making API requests
const apiRequest = async (dispatch, url, method = 'GET', data = null, successAction, failedAction) => {
    dispatch(getRequest());
    try {
        const config = {
            method,
            url,
            ...(data && { data, headers: { 'Content-Type': 'application/json' } })
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

// Fetch all teachers
export const getAllTeachers = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/Teachers/${id}`;
    apiRequest(dispatch, url, 'GET', null, getSuccess, getFailed);
};

// Fetch details for a specific teacher
export const getTeacherDetails = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/Teacher/${id}`;
    apiRequest(dispatch, url, 'GET', null, doneSuccess, getFailed);
};

// Update a teacher's subject
export const updateTeachSubject = (teacherId, teachSubject) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/TeacherSubject`;
    apiRequest(dispatch, url, 'PUT', { teacherId, teachSubject }, postDone, getFailed);
};
