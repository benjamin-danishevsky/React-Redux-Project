const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Notebook } = require('../../db/models');
const { Note } = require('../../db/models')



const router = express.Router();

router.get(
    '/users/:userId/notebooks',
    asyncHandler(async (req, res, next) => {
        const userId = req.params.userId

        const notebooks = await Notebook.findAll({
            where: { userId }
        });
        return res.json({ notebooks })

    })
);

const validateCreateNotebook = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for your notebook.')
]

router.post(
    '/users/:userId/notebooks',
    validateCreateNotebook,
    asyncHandler(async (req, res, next) => {
        const {
            userId,
            title
        } = req.body

        const newNotebook = await Notebook.create({
            userId,
            title
        })

        return res.json({newNotebook})
    })
);


router.delete(
    '/users/:userId/notebooks/',
    asyncHandler(async (req, res, next) => {
        const userId = req.params.userId
        const {notebookId} = req.body

        const deletedNotebook = await Notebook.findByPk(parseInt(notebookId));
        //console.log(deletedNotebook)
        if(deletedNotebook){
            const notesDeleted = await Note.findAll({
                where: {notebookId: deletedNotebook.id}
            })
            if(notesDeleted){
                notesDeleted.forEach(note => note.destroy());
                //console.log(notesDeleted)
            }
            deletedNotebook.destroy();
        }

        res.json({ deletedNotebook })

    })
);


router.put(
    '/users/:userId/notebooks/:notebookId/update',
    asyncHandler(async (req, res, next) => {
        const notebookId = req.params.notebookId;
        const notebook = await Notebook.findByPk(parseInt(notebookId))
        const newNotebook = await notebook.update(req.body)
        return res.json({newNotebook})

    })
);



module.exports = router;
