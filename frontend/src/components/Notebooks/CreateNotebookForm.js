import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";


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
            <ul></ul>
            <h2>Create a new notebook</h2>
            <label>
                Name:
                <input
                    type="text"
                    required
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateNotebookForm;
