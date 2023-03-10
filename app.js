const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.n1;
  const lastName = req.body.n2;
  const email = req.body.n3

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/1382dda341";
  const options = {
    method: "POST",
    auth: "deepak1:9cb0a45089c4a918677db796895ba855-us14"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

// This post method is for the button at the failure page which redirects to the home route.
app.post("/failure", function(req, res){
  res.redirect("/");
})
app.listen(3000, function(){
  console.log("Server running on port 3000");
})

// apikey
// 9cb0a45089c4a918677db796895ba855-us14
// listid
// 1382dda341
