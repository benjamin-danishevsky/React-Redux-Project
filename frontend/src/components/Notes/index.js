import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import {Modal} from '../../context/Modal';

import * as noteActions from '../../store/note';

import CreateNoteForm from './CreateNoteForm';
import EditNoteForm from './EditNoteForm';

function Notes () {
    const dispatch = useDispatch()
    const history = useHistory()

    //get user, userId, and current notebookId
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id
    const {notebookId} = useParams();

    //get all notes
    const notes = useSelector(state => state.notes)
    const data = Object.values(notes);
    //filter notes belonging to current notebook
    const filteredNotes = data.filter(note => note.notebookId === Number(notebookId))


    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        dispatch(noteActions.getNoteThunk(userId))
    }, [dispatch])

    let noteId;

    return (
        <div>
            <h1>My Notes</h1>
            {filteredNotes.map((note) => (

                <div className='note' key={note.id}>
                    <h3>Title: {note.title}</h3>
                    <h4>ID: {note.id}</h4>
                    <p>{note.content}</p>
                    <button onClick={() => setEditModal(true)} className='edit-btn'>EDIT</button>
                    {editModal && (
                        <Modal onClose={() => setEditModal(false)}>
                            <EditNoteForm
                                editModal={editModal}
                                setEditModal={setEditModal}
                            />
                        </Modal>
                    )}
                    <button onClick={() => dispatch(noteActions.deleteNoteThunk(note.id, userId))} className='delete-btn'>DELETE</button>
                </div>
            ))}

            <button onClick={() => setShowModal(true)} className='create-btn'>Create New Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateNoteForm
                        showModal={showModal}
                        setShowModal={setShowModal}
                        notebookId={notebookId}
                    />
                </Modal>
            )}
        </div>
    )
}

export default Notes;
