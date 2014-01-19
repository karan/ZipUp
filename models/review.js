var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    added_at: {
        // auto added timestamp for creation of bathroom entry
        type: Date,
        default: Date.now
    },
    rating: Number, // 1-5
    cleanliness: Number, // 0 = false, 1 = true
    aroma: Number, // 0 = false, 1 = true
    amenities: Number, // 0 = false, 1 = trues
    review: String, // body of review
    bathroom: String // id of the bathroom
});

module.exports = mongoose.model('Review', ReviewSchema);
