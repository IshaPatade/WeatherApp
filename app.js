const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res){
     res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req,res){
    
    const query= req.body.cityName;
    const apikey= "629766d5498c2ddd6a7e59ed2d463ec2";
    const unit ="metric";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid='+ apikey +"&units="+ unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
              const weatherData = JSON.parse(data);
              const temp = weatherData.main.temp;
              const description =weatherData.weather[0].description;
              const icon = weatherData.weather[0].icon;
              const imageurl= 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
              res.write("<p>The weather is " + description + ".</p>");
              res.write("<h3>The temperature is "+ temp + " degrees celsius.</h3>");
              res.write("<img src="+imageurl+" >");
              res.send();
        });
    });
});

app.listen(3000,function (){
    console.log("Server is running on port 3000.");
});