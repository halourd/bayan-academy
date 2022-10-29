const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp').then(()=> {
    console.log("Connection Open.")
})
.catch(err => {
    console.log("Error");
    console.log(err)
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number.']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories : [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', "L", "XL"]
    }
})

productSchema.methods.greet = function() {
    console.log("Hello World!");
}

const Product = mongoose.model('Product', productSchema)

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Bike Helmet'});
    console.log(foundProduct);
    foundProduct.greet();
}


findProduct();

// const bike = new Product({name: 'Cycling Jersey', price: 500, categories: ['Cycling'], size: 'XL'});
// bike.save()
//     .then(data => {
//         console.log("You have succesfully entered a new product.")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("Failed to enter the product.");
//         console.log(err)
//     })

// Product.findOneAndUpdate({name: 'Pump'}, {price: -1}, {new: true, runValidators: true})
//     .then(data => {
//         console.log("You have successfully updated a product.")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("Failed to update the product.")
//         console.log(err)
//     })