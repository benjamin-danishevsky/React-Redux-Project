import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import {Modal} from '../../context/Modal';
import './Notes.css'
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

    const [currentNoteId, setCurrentNoteId] = useState(0);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentContent, setCurrentContent] = useState('');

    useEffect(() => {
        dispatch(noteActions.getNoteThunk(userId))
    }, [dispatch])
    //if (!sessionUser) return <Redirect to="/" />;
    return (
        <div className='notes-container'>
            <h1>Your Notes</h1>
            <h2>{filteredNotes.length} Notes</h2>
            {filteredNotes.map((note) => (

                <div className='note' key={note.id}>
                    <h3 className='note-title'>{note.title}</h3>

                    <p className='note-content'>{note.content}</p>
                    <button onClick={() => {
                        setCurrentTitle(note.title)
                        setCurrentContent(note.content)
                        history.push(`/notebooks/${notebookId}/notes/${note.id}/edit`)
                        }} className='edit-btn'>EDIT</button>


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
