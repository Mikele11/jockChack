var express = require("express")
var app = express()
var mongojs = require("mongojs")
var db = mongojs("jock", ["jock"])
var bodyParser = require("body-parser")

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())

app.get("/random/", function (req, res) {
	var category = String(req.query.category[0])
	var count=Number(req.query.count[0]) 
	if (category == 1){
	  db.jock.aggregate({ $sample: { size: count } },function (err, docs) {
			res.json(docs)
	  })
	}else{
	  db.jock.aggregate([
			{$match: {category:category}},
			{$sample: {size: count}}
	  ],function (err, docs) {
			res.json(docs)
	  })
	}
})

app.post("/jock", function (req, res) {
	console.log(req.body)
	db.jock.insert(req.body, function(err, doc) {
		res.json(doc)
	})
})

app.listen(3000)
console.log("Server running on port 3000")