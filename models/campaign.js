const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
   name: String,
   description: String,
   timeCreated: { type: Date, default: Date.now },
   requiredFund: Number,
   creator: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Campaign", CampaignSchema);