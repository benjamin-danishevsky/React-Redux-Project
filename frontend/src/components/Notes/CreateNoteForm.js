import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";

import * as noteActions from '../../store/note';

function CreateNoteForm ({showModal, setShowModal, notebookId}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/signup" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = [];
        if(title.length < 1) validateErrors.push('Title is required');
        if(title.length > 100) validateErrors.push('Title is too long');
        if(content.length < 1) validateErrors.push('Content is required');

        if(validateErrors.length > 0){
            setErrors(validateErrors);
            return
        }
        const newNote = {
            userId,
            notebookId,
            title,
            content
        }
        dispatch(noteActions.postNoteThunk(newNote, userId))
        setShowModal(false);
    }

    return (
        <form onSubmit={handleSubmit} className='create-notebook-form'>
            <ul>
                {errors && errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <h2>Create a new note</h2>
            <label>
                Title
                <input
                    type="text"
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label>
                Content
                <textarea
                    type="text"
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}


export default CreateNoteForm;
