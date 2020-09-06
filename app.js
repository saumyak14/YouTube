require('dotenv').config()
const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
const path = require("path")

var jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM();
const {document} = (new JSDOM('')).window;
global.document = document;
var $ = require('jquery')

var $ = jQuery = require('jquery')(window);

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, "public")))
 ytData=" "
 data = '';

app.post("/", function(req, res) {

      query = req.body.title
      const apikey=process.env.API_KEY
      const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apikey + "&type=video&q=" + query + "&maxResults=10"


      https.get(url, (resp) => {


        console.log(resp.statusCode);

        // A chunk of data has been recieved.

        resp.on('data', (chunk) => {

          data += chunk;
        });


        resp.on('end', () =>{

          ytData = JSON.parse(data)
          console.log(ytData);




             res.redirect("/content")



              // ytData.items.forEach(item => {
              // console.log(item.id.videoId);
              //
              // video = `
              //     <iframe width="420" height="315" src="http://www.youtube.com/embed/<%=item.id.videoId%>" frameborder="0" allowfullscreen></iframe>
              //        `
              //  $("#videos").append(video)
              //
              //   console.log(video);
              // })
        })

// res.redirect("/")
        });
   });
      app.get("/", function(req, res) {
        res.render("index",{ytData:ytData})
      })


      app.get("/content", function(req, res) {
        res.render("content", {ytData: ytData})
      })

      app.listen(3000, function() {
        console.log("Server started on port 3000");
      })
