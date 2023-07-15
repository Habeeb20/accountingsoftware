const mongoose = require('mongoose');


const debtorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
        

    },

    amount: {
        type: String,
        required:true

    },

    phone: {
        type: String,
        required:true
        
    }
});


module.exports = mongoose.model("Debtor", debtorSchema)