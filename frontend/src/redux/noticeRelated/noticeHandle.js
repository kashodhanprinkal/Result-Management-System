import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
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
}
