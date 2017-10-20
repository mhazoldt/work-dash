exports.token = function(req, res, next) {
    



    
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
}