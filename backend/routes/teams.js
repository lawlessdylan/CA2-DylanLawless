/**
 * @Date:   2020-01-14T10:43:43+00:00
 * @Last modified time: 2020-02-15T16:21:48+00:00
 */

//
const router = require('express').Router();

let Team = require('../models/Teams');
let Player =  require('../models/Player');
const ObjectID = require('mongodb').ObjectID;


router.route('/').get((req, res) => {
  Team.find()
  .then(teams => res.json(teams))
  .catch(err => res.status(400).json('Error: ' + err));


  // res.json({message: "You are trying to see a list of teams"});
});





router.route("/:id").get((req, res) => {

  const teamId = req.params.id;

    Team.findById(teamId)
        .then(result => {
            if(!result){
                return res.status(404).json({
                        message: "Team not found with id " + teamId
                });
            }
            res.json(result);
        })

        .catch(err =>{
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                        message: "Team not found with id " + teamId
                });
            }
            return res.status(500).json({
                    message: "Error retrieving team with id " + teamId
            });
        });

});



router.route("/:id").put((req, res) => {
  const teamId = req.params.id;
  const newTeam = req.body;


  if(!newTeam.nation) {
      return res.status(400).json({
          message: "Nation name cannot be blank"
      });
  }


  Team.findByIdAndUpdate(teamId, newTeam, {new: true})
    .then(team => {
        if(!team) {
            return res.status(404).json({
                message: "Team not found with id" + teamId
            });
        }
        res.json(team);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                    message: "Team not found with id " + teamId
            });
        }
        return res.status(500).json({
                message: "Error updating team with id " + teamId
        });
    });


});







router.route("/:id").delete((req, res) => {
  const teamId = req.params.id;

  console.log("Deleting team with id: ", teamId);
  res.json({message: "You are trying to delete a team: ", teamId});

  // res.json(data);
});



module.exports = router;
