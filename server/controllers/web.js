// var path = require('path')
// var express = require('express')


exports.index = function(req, res, next) {
    
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
}