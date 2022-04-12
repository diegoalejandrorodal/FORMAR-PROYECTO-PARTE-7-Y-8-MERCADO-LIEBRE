/* Procesa la carga de archivos en nuestra app */
/* Aqui estará la configuración que necesita multer(requerir multer y path) */
const multer = require('multer');
const path = require('path');

/* Este bloque de código siempre será igual, asi que lo podemos copiar y pegar en otro proyecto y seguirá funcionando */
/* De multer se usa el método diskStorage y tendra dos parámetros  */
const storage = multer.diskStorage({ 
    /* En esta linea se configura dónde será guardado el archivo(cb es callback) */
    destination: function (req, file, callBack) { 
       /*  ../salgo de la carpeta middlewares ../para salir de src y ahi puedo entrar a public */
        callBack(null, path.join(__dirname, '../../public/images/products'))  
    },
    filename: function (req, file, callBack) { 
       /*  Y aqui se hará una función en donde guardará el archivo con un numero unico en caso de que se repita */
        callBack(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const uploadFile = multer({storage});


module.exports = uploadFile;