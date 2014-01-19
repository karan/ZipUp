var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var BathroomSchema = new Schema({
    added_at: {
        // auto added timestamp for creation of bathroom entry
        type: Date,
        default: Date.now
    },
    loc: {
        "lat": Number,
        "lng": Number
    },
    name: String,
    floor: String,
    requirements: Number, // 0 public, 1 private, 2 purchase reqd
    unisex: Boolean,
    stall_count: Number,
    rating: Number
});

module.exports = mongoose.model('Bathroom', BathroomSchema);
