const express = require('express')
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Notebook } = require('../../db/models');



const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {

        const notebooks = await Notebook.findAll();
        return res.json({ notebooks })

    })
);



module.exports = router;
