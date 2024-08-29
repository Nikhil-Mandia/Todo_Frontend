import axios from "axios";

export const GET_TODOS = "GET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TODO_ERROR = "TODO_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

const apiUrl = process.env.REACT_APP_API_URL;

export const getTodos = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${apiUrl}/api/todos`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.msg,
    });
  }
};

export const addTodo = (todo) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(`${apiUrl}/api/todos`, todo, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message || "Error adding todo",
    });
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(`${apiUrl}/api/todos/${id}`, todo, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message || "Error updating todo",
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${apiUrl}/api/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.msg,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiUrl}/api/auth/register`, {
      username,
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
  }
};
