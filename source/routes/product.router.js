import productManager from "./productManager.js";
const express = require("express")
const router = express.Router()





//TRAER TODOS LOS PRODUCTOS
router.get("/", async (req, res) => {
    try{
        let products = await productManager.getProducts();
        res.send(products);

    }catch(err){
        console.log(err);
        res.status(500).send("Error interno del servidor");
    }
})

//TRAER POR ID ok
router.get('/:pid', async(req,res) => {
    let id = req.params.pid;
    try{
        const productXid = parseInt(id);
        if(productXid === null){
            res.send('el Id ingresado no existe');
        } else{
            const productId = await productManager.getProductById(productXid);
            res.send(productId);

        } } catch(err){
            console.log(err);
            res.status(500).send('Error interno del servidor');
        }
 })

 //AGREGAR UN PRODUCTO OK


 router.post('/:pid', (req, res)=>{
    let id = req.params.id;
    let status = true;
    let product = req.body
    productManager.addProduct(id, product.title, product.description, product.code, product.price, status,  product.stock, product.category);
    res.send('producto agregado')
    
 })

 // UPDATE UN PRODUCTO 

 router.put('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    const { prop, change } = req.body;

    if (!prop || !change) {
        return res.status(400).send('Propiedad y cambio son campos obligatorios.');
    }

    try {
        productManager.updateProduct(id, prop, change);
        res.send('Producto actualizado correctamente.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});


//BORRAR UN PRODUCTO

router.delete('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);

    try {
        productManager.deleteProduct(id);
        res.send('Producto  eliminado correctamente.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor.');
    }
});




export default router;

