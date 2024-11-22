
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { userActions } from "../store";

const API_BASE_URL = 'http://localhost:4000'; // Replace with your server URL

interface DecodedToken {
  user_id: number; // Or `string` if appropriate?
  iat?: number;
  exp?: number;
}


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const initializeAuthToken = (dispatch?: (action: any) => void) => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    save_user_id(token, dispatch);
  }
};

export const setAuthToken = (token: string | null, dispatch?: (action: any) => void) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
    save_user_id(token, dispatch);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

function save_user_id(token: string, dispatch?: (action: any) => void) : void {
    // Decode the token to extract user_id
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token); // 'sub' typically contains user_id
    const userId: number = decoded.user_id;

    // Dispatch action to save user_id in Redux store, if dispatch is available
    if (dispatch) {
      dispatch(userActions.setUserId(userId));
    }
}
