import {csrfFetch} from './csrf';

//consts for payload types
const GET_NOTEBOOKS = '/notebooks/GET_NOTEBOOKS'
const CREATE_NOTEBOOK = '/notebooks/CREATE_NOTEBOOK'
const UPDATE_NOTEBOOK = '/notebooks/UPDATE_NOTEBOOK'
const DELETE_NOTEBOOK = '/notebooks/DELETE_NOTEBOOK'

//action creators
export const getNotebooks = (notebooks) => {
    return {
        type: GET_NOTEBOOKS,
        notebooks,
    };
}

export const createNotebook = (newNotebook) => {
    return {
        type: CREATE_NOTEBOOK,
        newNotebook
    }
}

export const updateNotebook = (notebook) => {
    return {
        type: UPDATE_NOTEBOOK,
        notebook
    }
}

export const deleteNotebook = (notebook) => {
    return {
        type: DELETE_NOTEBOOK,
        notebook
    }
}

//thunks

//get all notebooks
export const fetchNotebooks = (userId) => async (dispatch) => {

    const response = await csrfFetch(`/api/users/${userId}/notebooks`)
    if(response.ok) {
        const notebooks = await response.json();
        //console.log(notebooks.notebooks)
        dispatch(getNotebooks(notebooks.notebooks));
        //return notebooks;
    }
};

//create a notebook
export const postNotebook = (notebook, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/notebooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(notebook)
    });
    if(response.ok){

        const newNotebook = await response.json()
        console.log(newNotebook)
        dispatch(createNotebook(newNotebook))
        //return newNotebook
    }

}

export const deleteNotebookThunk = (notebookId, userId) => async (dispatch) => {

    const response = await csrfFetch(`/api/users/${userId}/notebooks/${notebookId}`, {
      method: 'DELETE',

    });

    if (response.ok) {
        const removedNotebook = await response.json();
        console.log(removedNotebook)
        dispatch(deleteNotebook(removedNotebook));
        return removedNotebook
    }
}

const initialState = {};



const notebookReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_NOTEBOOKS:
            //works
            newState = {...state};
            action.notebooks.forEach(notebook => newState[notebook.id] = notebook)
            return newState;
        case CREATE_NOTEBOOK:
            return {...state, [action.newNotebook.id]: action.newNotebook}
        case DELETE_NOTEBOOK:
            newState = {...state};
            delete newState[action.notebook]
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
