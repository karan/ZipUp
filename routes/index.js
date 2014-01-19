var mongoose = require('mongoose');
//var Bathroom = require('./../models/bathroom');
var Bathroom = mongoose.model('Bathroom');

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
        "unisex": req.body.unisex,
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
