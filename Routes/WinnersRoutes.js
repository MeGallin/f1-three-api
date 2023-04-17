const express = require('express');
const router = express.Router();
const { winners_2023 } = require('../Controllers/WinnersController');

router.route('/winners/2023/:id').get(winners_2023);
module.exports = router;
