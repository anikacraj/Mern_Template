const mongoose = require('mongoose');

// Define the schema for storing ad slider images
const adsSliderSchema = new mongoose.Schema({
    ImageOne: {
        type: String,
        required: true,
    },
    ImageTwo: {
        type: String,
        required: true,
    },
    ImageThree: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, 
    },
});

// Create the model using the schema
const adsSliderSchemaModel = mongoose.model("AdsSliderImage", adsSliderSchema);

module.exports = adsSliderSchemaModel;

