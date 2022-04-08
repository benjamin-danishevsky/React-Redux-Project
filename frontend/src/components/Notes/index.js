import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import {Modal} from '../../context/Modal';

import * as noteActions from '../../store/note';



function Notes () {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const notes = useSelector(state => state.notes)
    const data = Object.values(notes);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(noteActions.getNoteThunk(userId))
    }, [dispatch])

    return (
        <div>
            <h1>My Notes</h1>
            {data.map((note) => (
                <div className='note-title' key={note.id}>
                    <h3>Title: {note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => dispatch(noteActions.deleteNoteThunk(note.id, userId))}>DELETE</button>
                </div>
            ))}

            {/* <button onClick={() => setShowModal(true)}>Create New Note</button> */}

        </div>
    )
}

export default Notes;
