import { csrfFetch } from './csrf';

const GET_NOTES = '/notes/GET_NOTES';
const CREATE_NOTE = '/notes/CREATE_NOTE';
const UPDATE_NOTES = '/notes/UPDATE_NOTES';
const DELETE_NOTES = '/notes/DELETE_NOTES';

//action creators
export const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        notes
    }
}

export const createNote = (newNote) => {
    return {
        type: CREATE_NOTE,
        newNote
    }
}

export const updateNote = (note) => {
    return {
        type: UPDATE_NOTE,
        note
    }
}

export const deleteNote = (note) => {
    return {
        type: DELETE_NOTE,
        note
    }
}


//thunks

//get notes thunk
export const getNoteThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/notes`);
    if(response.ok){
        const notes = await response.json();
        dispatch(getNotes(notes.notes))
    }
}
