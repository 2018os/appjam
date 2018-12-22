const jwt = require('jsonwebtoken');
const constants = require('../config/config');

module.exports = (req, res, next) => {
    console.log('header: ' + req.headers.toString());
    if(req.headers.authorization) {
        jwt.verift(req.headers.authorization, constants.JWT_SALT , (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
            }
        });
    }
    next();
}