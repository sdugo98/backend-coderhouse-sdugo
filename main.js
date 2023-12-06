// Dentro de este archivo se creara la clase ProductManager.
class ProductManager{
    static idprod = 0;

    constructor(){
        this.products = [];
    }

    addProduct(title,description,price,img,code,stock){
        if(!title || !description || !price || !img || !code || !stock){
            console.warn("Error: Se deben completar todos los campos obligatoriamente.")
        return;
        }
        if(this.products.some(item=> item.code === code)){
            console.warn("El codigo debe ser unico.")
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
       this.products.push(newProduct)
    }

    getProducts(){
        console.log(this.products);
    }

    getProductById(id){
        const product = this.products.find(item =>item.id === id)
        if (!product){
            console.warn(`No se ha encontrado el producto con el id: ${id}`)
        }else{
            console.log(product)
        }
    }
}

const manager1 = new ProductManager();

manager1.addProduct("Banana","Fruta",50,"banana.jpg",5,50)
manager1.addProduct("Manzana","Fruta",30,"manzana.jpg",6,60)

