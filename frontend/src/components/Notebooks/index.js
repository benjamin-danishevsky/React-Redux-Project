import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import {Modal} from '../../context/Modal';
import './Notebooks.css';

import CreateNotebookForm from './CreateNotebookForm';

import * as notebookActions from '../../store/notebook';

function Notebooks(){

    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id
    const notebooks = useSelector(state => state.notebooks);
    const data = Object.values(notebooks)

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(notebookActions.fetchNotebooks(userId))
    }, [dispatch])

    
    return(
        <div className="notebook-container">

            <h2>Your Notebooks</h2>
            <h3>{data.length} Notebooks</h3>
            {data.map((notebook) => (

                <div className='notebook-title' key={notebook.id}>
                    <Link to={`/notebooks/${notebook.id}` } className='notebook-link'>Title: {notebook.title}</Link>
                    <button className='notebook-delete-btn' onClick={() => dispatch(notebookActions.deleteNotebookThunk(notebook.id, userId))}> Delete</button>
                </div>
            ))}

            <button className='notebook-create-btn' onClick={() => setShowModal(true)}>Create New Notebook</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateNotebookForm showModal={showModal} setShowModal={setShowModal}/>
                </Modal>
            )}
            {/* <img src='' alt='gif'/> */}
            <iframe src="https://giphy.com/embed/3oKGzvg3gGxSS3O38A" width="280" height="280" frameBorder="0" allowFullScreen></iframe>
        </div>
    )
}


export default Notebooks;
