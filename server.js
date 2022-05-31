const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController.js')


const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {  //  Getting All Products
        getProducts(req, res)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {    //  Getting a Specific Product
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if (req.url === '/api/products/add' && req.method === 'POST') {  //  Creating a New Product
        createProduct(req, res)
    } else if (req.url.match(/\/api\/products\/update\/([0-9]+)/) && req.method === 'PUT') {    //  Updating a existing Product
        const id = req.url.split('/')[4]
        updateProduct(req, res, id)
    } else if (req.url.match(/\/api\/products\/delete\/([0-9]+)/) && req.method === 'DELETE') { //  Deleting a product
        const id = req.url.split('/')[4]
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Route not found!" }))
    }

})


const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))