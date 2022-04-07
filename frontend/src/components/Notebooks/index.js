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
    //const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(notebookActions.fetchNotebooks(userId))
    }, [dispatch])
    //dispatch(notebookActions.deletedNotebookThunk(notebook.id, userId))

    return(
        <div>

            <h1>My Notebooks</h1>
            <h2>Notebooks</h2>
            {data.map((notebook) => (
                <div className='notebook-title' key={notebook.id}>
                    <Link to={`/notebooks/${notebook.id}` } className='notebook-link'>{notebook.title}</Link>
                    {/* <button>Edit Notebook</button> */}

                    <button onClick={() => setShowDeleteModal(true)}> Delete</button>
                    {showDeleteModal && (
                        <Modal onClose={() => setShowDeleteModal(false)}>
                            <h3>Are you sure?</h3>
                            <button onClick={() => {
                                dispatch(notebookActions.deleteNotebookThunk(notebook.id, userId))
                                setShowDeleteModal(false)
                            }}>Yes, I am sure</button>
                        </Modal>
                    )}
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
