var friends = require("../data/friends");

module.exports = function (app) {

    //show a list of potential friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        //setting user input to friend
        var friend = req.body;

        // taking user input and parsing into integers
        for (var i = 0; i < friend.scores.length; i++) {
            friend.scores[i] = parseInt(friend.scores[i]);
        }

        //variables
        var leastDiff = 100;
        var matchup = 0;
        var bestFriend;

        //for loop going through each potential friend and comparing answers
        for (var i = 0; i < friends.length; i++) {
            for (var f = 0; f < friends[i].scores.length; f++) {
                var difference = Math.abs(friend.scores[f] - friends[i].scores[f]);
                matchup += difference;
            }

            //checking each round to see which friend is the closest match
            if (matchup < leastDiff) {
                leastDiff = matchup;
                bestFriend = i;
            } else {
                matchup = 0
            }
        }

        //push user input to friend object
        friends.push(friend);

        //push best friend to modal on survey.html
        res.json(friends[bestFriend]);


    });
};