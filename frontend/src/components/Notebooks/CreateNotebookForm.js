import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import './Notebooks.css';

import * as notebookActions from '../../store/notebook';


function CreateNotebookForm ({showModal, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/signup" />;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = [];
        if(title.length < 1) validateErrors.push('Title is required');
        if(title.length > 100) validateErrors.push('Title is too long');
        if(validateErrors.length > 0){
            setErrors(validateErrors);
            return;
        }

        const newNotebook = {
            userId,
            title,
        }
        dispatch(notebookActions.postNotebook(newNotebook, userId));
        setShowModal(false);

    }
    return (
        <form onSubmit={handleSubmit} className='create-notebook-form'>
            <h2 className='create-notebook-title'>Create a new notebook</h2>
            <ul className='create-notebook-errors'>
                {errors && errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <div className='notebook-create-form'>
                <label className='create-notebook-label'>
                    Name:
                    <input
                        className='create-notebook-input'
                        type="text"
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <button className='create-notebook-submit' type="submit">Submit</button>
            </div>
        </form>
    )
}

export default CreateNotebookForm;
