// Importación de modulos
const fs = require('fs').promises;


// Dentro de este archivo se creara la clase ProductManager.
class ProductManager{
    static idprod = 0;

    constructor(path){
        this.products = [];
        this.path = path;
    }

    async addProduct(nuevoObjeto) {
        let { title, description, price, img, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.warn("Error: Se deben completar todos los campos obligatoriamente.");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.warn("El codigo debe ser unico.");
            return;
        }

        const newProduct = {
            id: ++ProductManager.idprod,
            title,
            description,
            price,
            img,
            code,
            stock
        }


        this.products.push(newProduct);

        //Guardamos el array de forma asincronica

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const product = arrayProductos.find(item => item.id === id);

            if (!product) {
                console.log(`No se ha encontrado el producto con el id: ${id}`)
            } else {
                console.log(product);
                return product;
            }

        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Se ha producido un error al leer el archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    //  Metodo asincronico para actualizar un producto.
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log(`No se ha encontrado el producto con el id ${id}`);
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    // Metodo asincronico para eliminar un producto.
    async deleteProduct(id){
        try{
            const arrayProductos = await this.leerArchivo();
            const index =  arrayProductos.findIndex(item =>  item.id === id);
            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("No se ha encontrado el producto.");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

}

async function testDelete(id){
    try{
     manager.deleteProduct(id);
        } catch {
        console.log(`No se ha encontrado el producto con el id ${id}` ,error)
    }
}


module.exports = ProductManager;