// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  let date = new Date(NOW);
  if (date.toString() === 'Invalid Date') {
    res.json({ error : "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }  
});

app.get("/api/:dateStr", function(req, res) {
  const date_str = req.params.dateStr
  let date = new Date(date_str);
  
  // convert unix milliseconds to date string
  if (date.toString() === 'Invalid Date') {
    date = new Date(parseInt(date_str));
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error : "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
