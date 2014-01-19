var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    added_at: {
        // auto added timestamp for creation of bathroom entry
        type: Date,
        default: Date.now
    },
    rating: Number, // 1-5
    cleanliness: Number, // 1-5
    aroma: Number, // 1-5
    amenities: Number, // 1-5
    wait_time: Number, // minutes
    title: String, // title of review
    review: String, // body of review
    bathroom: String
});

module.exports = mongoose.model('Review', ReviewSchema);
