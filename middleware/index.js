var Campaign = require("../models/campaign");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCampaignOwnership = (req, res, next) => {
 if(req.isAuthenticated()){
        Campaign.findById(req.params.id, function(err, foundCampaign){
           if(err){
               req.flash("error", "Campaign not found");
               res.redirect("back");
           }  else {
               // does user own the Campaign?
            if(foundCampaign.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;