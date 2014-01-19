var mongoose = require('mongoose');
//var Bathroom = require('./../models/bathroom');
var Bathroom = mongoose.model('Bathroom');
var Review = mongoose.model('Review');

exports.index = function(req, res) {
    return res.send({'Start': 'Hello'});
}

exports.getAll = function(req, res) {
    Bathroom.find({}, function(err, all) {
        if (err) {
            res.json({'Error': 'Something went wrong'})
        } else {
            res.json({'bathrooms': all});
        }
    })
}

exports.addBathroom = function(req, res) {
    var newBathroom = new Bathroom({
        "loc": {
            "lat": req.body.lat,
            "lng": req.body.lng,
        },
        "name": req.body.bname,
        "floor": req.body.floor,
        "requirements": req.body.reqs,
        "gender": req.body.gender,
        "stall_count": req.body.stall_count
    });
    console.log(newBathroom);
    newBathroom.save(function(err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(newBathroom)
}

exports.getBathroom = function(req, res) {
    Bathroom.findById(req.params.id, function(err, bathroom) {
        if (!err) {
            return res.json(bathroom);
        } else {
            console.log(err);
        }
    })
}

exports.getReviews = function(req, res) {
    Review.find({"bathroom": req.params.bid}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            console.log(err)
        }
    });
}

exports.addReview = function(req, res) {
    var newReview = new Review({
        "rating": req.body.rating,
        "cleanliness": req.body.clean,
        "aroma": req.body.aroma,
        "amenities": req.body.amenities,
        "review": req.body.review,
        "bathroom": req.params.bid
    });

    newReview.save(function(err, review) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(newReview);
}
