const fs = require('fs').promises;
//Importacion modulo express
const express =  require('express');

//declaración de variable del puerto
const PORT = 8080;

const app = express();

app.get("/", (req, res) =>{
    res.send("Bienvenidos a la pagina principal.")
})

app.get('/products',async(req,res) => {
    try{

        let productos = await manager.leerArchivo();
        let limit = parseInt(req.query.limit);

        if(limit){
            const productsLimit = productos.slice(0,limit)
            return res.send(productsLimit);
        } else {
            return res.send(productos)
        }
    } catch (error){
        console.log(error);
        return res.send('Error en el cargado de productos.');
    }
});

app.get('/products/:pid', async(req,res)=>{
    try{
        let productId = parseInt(req.params.pid);
        let productoBuscado = await manager.getProductById(productId);
        if(productoBuscado){
            return res.send(productoBuscado)
        } else {
           return res.send(`No se ha encontrado el producto con el id ${productId}`)
        }
    } catch (error){
        console.log(error);
        res.send("Se ha encontrado un error al buscar el producto por su id");
    }
})


const ProductManager = require("./productManager")
const manager = new ProductManager("./src/productos.json");
manager.getProducts();

app.listen(PORT, ()=>{
    console.log(`Aplicación escuchando en http://localhost:${PORT}`);
});
