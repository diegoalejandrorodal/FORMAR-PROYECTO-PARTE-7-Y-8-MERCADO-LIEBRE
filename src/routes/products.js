// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadProductFiles') //Requerimos el middleware que tiene la configuracion de multer

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); //Aqui podemos ponerles el mismo nombre a la ruta porque no habra problemas porque una es por get y la otra por post
router.post('/', upload.single('image'), productsController.store); //Recibira los datos del form para poder cargarlos
/* Entre el string y el controlador nos llamamos a upload y este tiene que usar el método single */
/* En post y put aplicaremos multer */


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
