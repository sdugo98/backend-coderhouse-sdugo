import { Router } from "express";
import { productManager } from "../app.js";


const productsRouter = Router()



productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }
        return res.json(products)

    } catch (error) {
        console.log(error)
        res.send('error al intentar recibir los productos')
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const products = await productManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.send(`error al intentar recibir el producto con ID ${pid}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const response = await productManager.addProduct({ title, description, code, price, status, stock, category, thumbnail })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(`error al intentar recibir el producto`)
    }
})

productsRouter.put('/:pid', async (req, res) => {

    const { pid } = req.params

    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const response = await productManager.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnail })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(`error al intentar editar el producto con ID ${pid}`)
    }
})


productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        await productManager.deleteProduct(pid)
        res.send('producto eliminado exitosamente')
    } catch (error) {
        res.send(`error al intentar eliminar el producto con ID ${pid}`)
    }
})




export { productsRouter }