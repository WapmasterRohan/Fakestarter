const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const TxSchema = new mongoose.Schema({
    amount: Number,
    fromAddress: String,
    toAddress: String,
    timeStamp: { type: Date, default: Date.now },
    signature: String
});

// UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Tx", TxSchema);