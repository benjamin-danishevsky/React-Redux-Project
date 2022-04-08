import { csrfFetch } from './csrf';

const GET_NOTES = '/notes/GET_NOTES';
const CREATE_NOTE = '/notes/CREATE_NOTE';
const UPDATE_NOTE = '/notes/UPDATE_NOTES';
const DELETE_NOTE = '/notes/DELETE_NOTES';

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

//create note thunk
export const postNoteThunk = (note, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    });
    if(response.ok){

        const newNote = await response.json()

        dispatch(createNotebook(newNote))
        return newNote
    }

}

//delete note thunk

export const deleteNoteThunk = (noteId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/notes/${noteId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
        const removedNote = await response.json();
        dispatch(deleteNotebook(removedNote));
        return removedNote
    }
}

//update note thunk
export const editNoteThunk = (updatedNote) => async (dispatch) => {
    const { userId, noteId, title, content } = updatedNote;
    const response = await csrfFetch(`/api/users/${userId}/notes/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, noteId, title, content})
    });
    if (response.ok) {
        const editedNote = await response.json();
        dispatch(updateNote(editedNote));
        return editedNote
    }
}

const initialState = {};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_NOTES:
            newState = {...state};
            action.notes.forEach(note => newState[note.id] = note);
            return newState;
        case CREATE_NOTE:
            newState = {...state};
            newState[action.newNote.newNote.id] = action.newNote.newNote
            return newState;
        case UPDATE_NOTE:
            newState = {...state};
            newState[action.note.id] = note
        case DELETE_NOTE:
            newState = {...state};
            delete newState[action.note.deletedNote.id]
            return newState;
        default:
            return state;
    }
}

export default noteReducer;
