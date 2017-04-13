// grab the package and variables
var express = require("express");
var app = express();
var ig = require("instagram-node").instagram();
var globals = require("./globals/variables");

// configure the app
// tell node where to look for site resources
app.use(express.static(__dirname + "/public"));
// set the view engine to ejs
app.set("view engine", "ejs");

/*==========================================================================================================*/
// configure instagram app with client-id
ig.use({
    // get access token here: http://instagram.pixelunion.net/
    access_token: globals.token
});

// alternatively we can use the client_id and client_secret // for now we'll use the access_token way
// ig.use({
    // get these from when we create our app as an instagram developer // https://www.instagram.com/developer/
    // client_id: 'MY_CLIENT_ID',
    // client_secret: 'MY_CLIENT_SECRET'
// });
/*==========================================================================================================*/

// set the routes
// home page route - our profile's images
app.get("/", function(req, res){
    // use the instagram package to get our profile's media
    // render the home page and pass in the our profile's images
    // ejs provides the res.render
    // By default, Express and ejs will look in a views/ folder so we don't have to specify views/pages/index.
    // pages/index will be enough

    // use the instagram package to get popular media
    ig.user_self_media_recent(function(err, medias, pagination, remaining, limit){
        // render the home page and pass in the popular images
        res.render("pages/index", { grams: medias });
    });
});

// start the server
app.listen(8080);
console.log("App started! Look at http://localhost:8080");
