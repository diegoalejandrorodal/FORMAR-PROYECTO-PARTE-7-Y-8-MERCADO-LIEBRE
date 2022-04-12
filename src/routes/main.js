// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); //Aqui renderiza la vista del home
//router.???('/search', mainController.search); 



module.exports = router;
