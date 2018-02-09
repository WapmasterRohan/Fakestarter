const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
   index: Number,
   prevHash: String,
   transactions: String,
   hash: String,
   nonce: Number,   
   timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Block", BlockSchema);