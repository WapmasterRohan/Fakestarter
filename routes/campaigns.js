const express = require("express");
const router  = express.Router();
const Campaign = require("../models/campaign");
const middleware = require("../middleware");


//INDEX - show all campaigns
router.get("/", (req, res) => {
    // Get all campaigns from DB
    Campaign.find({}, function(err, allCampaigns){
       if(err){
           console.log(err);
       } else {
          res.render("campaigns/index", {
              campaigns: allCampaigns
        });
       }
    });
});

//CREATE - add new campaign to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campaigns array
    const name = req.body.name;
    const desc = req.body.description;
    const creator = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampaign = {name: name, description: desc, creator: creator, fundRequired: fundRequired};
    // Create a new campground and save to DB
    Campaign.create(newCampaign, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campaigns page
            console.log(newlyCreated);
            res.redirect("/campaigns");
        }
    });
});

//NEW - show form to create new campaign
router.get("/new", middleware.isLoggedIn, (req, res) => {
   res.render("campaigns/new"); 
});

// SHOW - shows more info about one campaign
router.get("/:id", (req, res) => {
    //find the campaign with provided ID
    Campaign.findById(req.params.id).populate("comments").exec(function(err, foundCampaign){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampaign)
            //render show template with that campaign
            res.render("campaigns/show", { campaign: foundCampaign });
        }
    });
});

// EDIT CAMPAIGN ROUTE
router.get("/:id/edit", middleware.checkCampaignOwnership, (req, res) => {
    Campaign.findById(req.params.id, function(err, foundCampaign){
        res.render("campaigns/edit", {campground: foundCampaign});
    });
});

// UPDATE CAMPAIGN ROUTE
router.put("/:id",middleware.checkCampaignOwnership, (req, res) => {
    // find and update the correct campaign
    Campaign.findByIdAndUpdate(req.params.id, req.body.campaign, function(err, updatedCampaign){
       if(err){
           res.redirect("/campaigns");
       } else {
           //redirect somewhere (show page)
           res.redirect("/campaigns/" + req.params.id);
       }
    });
});

// DESTROY CAMPAIGN ROUTE
router.delete("/:id",middleware.checkCampaignOwnership, (req, res) => {
   Campaign.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campaigns");
      } else {
          res.redirect("/campaigns");
      }
   });
});

module.exports = router;

