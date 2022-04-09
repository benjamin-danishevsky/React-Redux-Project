import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import {Modal} from '../../context/Modal';

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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentBookId, setCurrentBookId] = useState();

    useEffect(() => {
        dispatch(notebookActions.fetchNotebooks(userId))
    }, [dispatch])

 
    return(
        <div>

            <h1>My Notebooks</h1>
            <h2>Notebooks</h2>
            {data.map((notebook) => (

                <div className='notebook-title' key={notebook.id}>
                    <Link to={`/notebooks/${notebook.id}` } className='notebook-link'>Title: {notebook.title}</Link>


                    <button onClick={() => dispatch(notebookActions.deleteNotebookThunk(notebook.id, userId))}> Delete</button>
                    {/* {showDeleteModal && (
                        <Modal onClose={() => setShowDeleteModal(false)}>
                            <h3>Are you sure?</h3>
                            <button onClick={() => {
                                dispatch(notebookActions.deleteNotebookThunk(notebook.id, userId))
                                setShowDeleteModal(false)
                            }}>Yes, I am sure. {notebook.title} {notebook.id}</button>
                        </Modal>
                    )} */}
                </div>
            ))}
            <button onClick={() => setShowModal(true)}>Create New Notebook</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateNotebookForm showModal={showModal} setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}


export default Notebooks;
