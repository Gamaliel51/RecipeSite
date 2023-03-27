const { default: mongoose } = require("mongoose");


const PreviewSchema = new mongoose.Schema({
    dishId: String,
    dishname: String,
    ingredients: Array,
    dishpicture: String,
    locality: String,
})

const DishSchema = new mongoose.Schema({
    dishId: String,
    procedure: String,
})


const Preview = mongoose.models.Preview || mongoose.model('Preview', PreviewSchema)
const Dish = mongoose.models.Dish || mongoose.model('Dish', DishSchema)

export { Preview, Dish }