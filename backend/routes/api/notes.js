const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Note } = require('../../db/models');
const { Notebook } = require('../../db/models')


const router = express.Router();

router.get(
    '/users/:userId/notes',
    asyncHandler(async (req, res, next) => {
        const userId = req.params.userId

        const notes = await Note.findAll({
            where: { userId }
        });
        return res.json({ notes })
    })
);

const validateCreateNote = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for your notebook.'),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide content for your note.')
]


router.post(
    '/users/:userId/notes',
    validateCreateNote,
    asyncHandler(async (req, res, next) => {
        const {
            userId,
            notebookId,
            title,
            content
        } = req.body

        const newNote = await Note.create({
            userId,
            notebookId,
            title,
            content
        })

        return res.json({newNote})
    })
);

router.delete(
    '/users/:userId/notes/:noteId',
    asyncHandler(async (req, res, next) => {
        const userId = req.params.userId
        const noteId = req.params.noteId


        const deletedNote= await Note.findByPk(parseInt(noteId));
        //console.log(deletedNotebook)
        if(deletedNote){
            deletedNote.destroy();
        }

        res.json({ deletedNote })

    })
);

router.put(
    '/users/:userId/notes/:noteId/update',
    asyncHandler(async (req, res, next) => {
        const noteId = req.params.noteId;
        const note = await Note.findByPk(parseInt(noteId))
        const newNote = await note.update(req.body)
        return res.json({newNote})

    })
);




module.exports = router;
