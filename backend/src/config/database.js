const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb+srv://semana:wjd123@cluster0-onnlg.mongodb.net/todocls?retryWrites=true&w=majority',{
    useNewUrlParser:true
});