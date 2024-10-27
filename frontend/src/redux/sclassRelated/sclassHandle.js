import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

// Reusable function for fetching data
const fetchData = async (dispatch, url, successAction, failedAction) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(url);
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

// Fetch all classes
export const getAllSclasses = (id, address) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`;
    fetchData(dispatch, url, getSuccess, getFailedTwo);
};

// Fetch students for a class
export const getClassStudents = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/Sclass/Students/${id}`;
    fetchData(dispatch, url, getStudentsSuccess, getFailedTwo);
};

// Fetch details for a specific class
export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        } else {
            dispatch(getError("No data found"));
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

// Fetch a list of subjects
export const getSubjectList = (id, address) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/${address}/${id}`;
    fetchData(dispatch, url, getSubjectsSuccess, getFailed);
};

// Fetch subjects for a teacher's free class
export const getTeacherFreeClassSubjects = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}/FreeSubjectList/${id}`;
    fetchData(dispatch, url, getSubjectsSuccess, getFailed);
};

// Fetch details of a specific subject
export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        } else {
            dispatch(getError("No data found"));
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
