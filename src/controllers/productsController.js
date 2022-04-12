const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8'); //Esta función solo escribe en el JSON

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { //Acá le estoy mandando todos los productos
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = +req.params.id; //Acá tengo el id que viene por parámetro, y le paso el + para pasarlo a numero
        let product = products.find(product => product.id === productId) //Captura el producto según el id y despues de todo pasarlo a la vista

		res.render('detail', {
            product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => { //Solo necesitamos pasarle la vista renderizada para que la rellene, es por get
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		//Al hacer un res.send me llegan los datos como en el json, diferente a res.render
		//res.send(req.body)En el body es donde viajan los datos del formulario en el objeto req
		//const { name, price, discount, category, description } = req.body;//Destructuramos el body y accedeemos a cada una de sus propiedades

		let lastId = 1;

		products.forEach(product => {
			if(product.id > lastId){
				lastId = product.id
			}
		});

		/* let newProduct = { //Este objeto creará el nuevo objeto
			id: lastId + 1,
			name,
			price: +price,
			discount: +discount,
			category,
			description,
			image: "default-image.png"
		} */

		let newProduct = { // <- objeto
			...req.body, //Con el espress operator sacamos varias lineas de codigo(como el objeto anterior)
			id: lastId + 1,
			image: req.file ? req.file.filename : "default-image.png"//if ternario, si subio archivos poner este nombre, sino poner imagen por default
		}

		products.push(newProduct)//Push, esto se empujaria al json

		writeJson(products)
		res.redirect('/products')
    //Este método store recibe información, la procesa, la guarda en la base de datos y por ultimo redirecciona a otro lado
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productId = +req.params.id;
		let productToEdit = products.find(product => product.id === productId);

		res.render('product-edit-form', {
			product: productToEdit
		})
	},
	// Update - Method to update
	update: (req, res) => {
        let productId = +req.params.id;

		const { name, price, discount, category, description } = req.body;

		products.forEach(product => {
			if(product.id === productId){
			    product.id = product.id,
			    product.name = name,
				product.price = +price,
				product.discount = discount,
				product.description = description
				if(req.file){
					if(fs.existsSync("./public/images/products/", product.image)){  
						fs.unlinkSync(`./public/images/products/${product.image}`)
					}else{
						 console.log("No encontré el archivo")
					}
					product.image = req.file.filename
				}else{
                    product.image = product.image
				}  //O cambia la imagen o deja la misma foto
			}
		}) 

		writeJson(products)

		res.redirect(`/products/detail/${productId}`) //Que me redireccione al producto que acabo de editar
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let productId = +req.params.id;

		products.forEach(product => {
			if(product.id === productId){

                if(fs.existsSync("./public/images/products/", product.image)){ //existsSync devuelve un booleano, en caso de que exista ese archivo lo vamos a eliminar con el método unlinkSync
                    fs.unlinkSync(`./public/images/products/${product.image}`)
				}else{
                     console.log("No encontré el archivo")
				}

                let productToDestroyIndex = products.indexOf(product) //Si encuentra el elemento indexOf me devuelve la posición si no lo encuentra me devuelve -1
				//Linea de abajo, primer parámetro es el indice del elemento a borrar y el segundo la cantidad de elementos que quiero borrar
				if(productToDestroyIndex !== -1) {
				    products.splice(productToDestroyIndex, 1)
				}else{
					console.log('No se encontró el producto')//Y en caso de que no lo encuentre me tirará un console.log 
			    } 
			}
		})

		writeJson(products)
		res.redirect('/products');
	}
};

module.exports = controller;