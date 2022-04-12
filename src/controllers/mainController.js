const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); //Guardamos la ruta a este archivo, el JSON
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //Traemos el JSON y lo parsea

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //Función expresada porque está asignada a una variable
//Esta función recibe un numero y lo pasa a string, hace un replace de ese string, y pone el punto a los numeros cuando pasa a miles
//Porque en el JSON no tiene puntos el precio, entonces cuenta de derecha a izquierda y pone un punto a los tres numeros

const controller = {
	index: (req, res) => {
		let productsInSale = products.filter(product => product.category === "in-sale") //Filtramos todos los productos que en su categoria figura como 'in-sale'
		//res.send(productsInSale) ->prueba, vemos la categoria inSale pero en formato JSON
		let productsVisited = products.filter(product => product.category === 'visited') //Hacemos lo mismo pero con los productos visitados

		res.render('index', { //Aqui mandamos todos estos productos seleccionados a la vista, sumado a la funcion toThousand que muestra el precio
			productsInSale, 
			productsVisited, 
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};



module.exports = controller;
