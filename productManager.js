const fs = require('fs')


class ProductManager{
    constructor(path){
        this.products = [];
        this.id = 0;
        this.path = path;
        this.initialize();
    }
    
    //METODO INICIALIZAR PRODUCTOS

    async initialize(){
        await this.getProducts();
        this.saveProducts();
    }

     // METODO GUARDAR PRODUCTOS
     async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            console.log('productos guardados correctamente');
        } catch (err) {
            console.log(err);
        }
    }


    //METODO TRAER PRODUCTOS
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
        } catch (err) {
            console.log(err);
        }
    }

    //METODO AGREGAR PRODUCTO A LA LISTA, CON VALIDACIONES
    async addProduct(title, description, code, price, stock, category, thumbnail) {

        if(!title || !description || !code || !price || !stock || !category){
            console.log('todos los campos son obligatorios');            
        } 
        const codeExists = this.products.some(product => product.code === code);

        if(codeExists){
            console.log('el código ingresado ya existe');
        }else{
            const product = {
                id: this.id,
                title: title,
                description: description,
                code: code,
                price: price,
                status: true,
                stock: stock,
                category: category,
                thumbnail: thumbnail,
            };
            this.products.push(product);
            this.id++;

        }

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));

        }
        catch(err){
            console.log(err);
        }
        
    }


    // METODO BORRAR PRODUCTO
 deleteProduct(id) {
    const idExists = this.products.some(product => product.id === id);
    if (idExists) {
        this.products = this.products.filter(product => product.id != id);
        console.log('producto borrado con exito');
        this.saveProducts(); 
    } else {
        console.log('el id ingresado no existe, por favor ingrese un id válido.');
    }
}


//METODO FILTRAR POR ID

getProductById(id){
    const productId = this.products.find(product => product.id === id);
    if(productId){
        return productId;
    }else{
        console.log('el id ingresado no existe, por favor ingrese un id válido.');
    }
}

// REEMPLAZAR ALGUNA PROPIEDAD DE UN PRODUCTO

updateProduct(id, prop, change) {
    let product = this.products.find(product => product.id === id);
    if (product) {
        if (prop in product) {
            product[prop] = change;
            console.log('La propiedad se modificó con éxito.');
            this.saveProducts();
        } else {
            console.log('La propiedad a modificar no existe.');
        }
    } else {
        console.log('El ID indicado no existe.');
    }
}



//METODO PARA LIMITAR LA CANTIDAD DE PRODUCTOS QUE SE MUESTRAN POR PÁGINA

limitProducts(limit){
    const limitProducts = this.products.slice(0, limit);
    return limitProducts;
}

}

const productManager = new ProductManager("./package-json/products.json");

productManager.addProduct('remera manga corta', 'remera blanca estampada', '100', 1000, 10, 'remeras');
productManager.addProduct('jean', 'fashion jeans', '101', 1200, 3, 'pantalones');
productManager.addProduct('mini falda', 'pollera tableada corta', '102', 950, 16, 'polleras');
productManager.addProduct('medias', 'soquetes deportivos', '103', 700, 25, 'accesorios'); 


 //productManager.getProducts(); //ok
//productManager.deleteProduct(2) //ok
 //console.log(productManager.getProductById(0)); //ok
 //productManager.updateProduct(1, 'description', 'jean negro') //FUNCIONA OK


export default productManager