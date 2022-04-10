import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from "react-router-dom";
import './Notes.css';

import * as noteActions from '../../store/note';

function EditNoteForm ({editModal, setEditModal, noteTitle, noteContent}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;

    const notes = useSelector(state => state.notes)
    const {notebookId, noteId} = useParams()

    const oldNote = notes[noteId]


    const [title, setTitle] = useState(oldNote.title);
    const [content, setContent] = useState(oldNote.content);
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/signup" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = [];
        if(title.length < 1) validateErrors.push('Title is required');
        if(title.length > 100) validateErrors.push('Title is too long');
        if(content.length < 1) validateErrors.push('Content is required');
        //if(!noteId) validateErrors.push('A note id is required');

        if(validateErrors.length > 0){
            setErrors(validateErrors);
            return
        }
        //console.log(typeof(noteId))
        const updatedNote = {
            userId,
            noteId,
            title,
            content
        }
        dispatch(noteActions.editNoteThunk(updatedNote))
        //history.push(`/notebooks/${userId}`)
        history.goBack();
    }

    return (
        <form onSubmit={handleSubmit} className='edit-notebook-form'>
            <h2 className='edit-note-title'>Update your note</h2>
            <ul className='edit-note-errors'>
                {errors && errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <div className='note-edit-form'>
                <label className='edit-note-label'>
                    Title
                    <input
                        className='edit-note-input'
                        type="text"
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label className='edit-note-label'>
                    Content
                    <textarea
                        className='edit-note-text'
                        type="text"
                        name='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>

                <button className='edit-note-submit'type="submit">Submit</button>
            </div>
        </form>
    )
}


export default EditNoteForm;
