const { default: mongoose } = require("mongoose");


const PreviewSchema = new mongoose.Schema({
    dishId: String,
    dishname: String,
    ingredients: Array,
    dishpicture: String,
    locality: String,
    extra: String,
})

const DishSchema = new mongoose.Schema({
    dishId: String,
    procedure: String,
})

const IngredientSchema = new mongoose.Schema({
    ingredients: Array,
})

const ingAddRequestSchema = new mongoose.Schema({
    dishname: String,
    name: String,
})

const SuggestionSchema = new mongoose.Schema({
    dishname: String,
    info: String,
})

const ReportSchema = new mongoose.Schema({
    dishname: String,
    problem: String,
})


const Preview = mongoose.models.Preview || mongoose.model('Preview', PreviewSchema)
const Dish = mongoose.models.Dish || mongoose.model('Dish', DishSchema)
const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema)
const ingAddRequest = mongoose.models.ingAddRequest || mongoose.model('ingAddRequest', ingAddRequestSchema)
const Suggestion = mongoose.models.Suggestion || mongoose.model('Suggestion', SuggestionSchema)
const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema)

export { Preview, Dish, Ingredient, ingAddRequest, Suggestion, Report }