const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Note } = require('../../db/models');


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






module.exports = router;
