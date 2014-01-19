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
    gender: Number, // 0 male, 1 female, 2 unisex
    stall_count: Number
});

module.exports = mongoose.model('Bathroom', BathroomSchema);
