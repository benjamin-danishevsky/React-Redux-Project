const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Note } = require('../../db/models');


const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        console.log('notes request');
        const notes = await Note.findAll();
        return res.json({ notes })
    })
);





module.exports = router;
