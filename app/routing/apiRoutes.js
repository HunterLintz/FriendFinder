var friends = require("../data/friends");
var questions = require("../data/questions");

module.exports = app => {
	
	app.get("/api/friends", (req, res) => res.json(friends))

	app.get("/api/questions", (req, res) => res.json(questions))

	app.post("/api/friends", (req,res) => {
		var newPerson = req.body;
		friends.push(newPerson);
		res.sendStatus(201)
	});
};