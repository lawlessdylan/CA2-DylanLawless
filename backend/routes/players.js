/**
 * @Date:   2020-01-14T10:43:43+00:00
 * @Last modified time: 2020-02-16T01:25:29+00:00
 */

//
const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);


const getToken = (headers) => {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2){
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

let Player = require('../models/Player');




router.route('/').get((req, res) => {
  Player.find().populate('team_id')
  .then(players => res.json(players))
  .catch(err => res.status(400).json('Error: ' + err));


  // res.json({message: "You are trying to see a list of players"});
});

router.route("/:id").get((req, res) => {

  const playerId = req.params.id;

    Player.findById(playerId).populate('team_id')
        .then(result => {
            if(!result){
                return res.status(404).json({
                        message: "Player not found with id " + playerId
                });
            }
            res.json(result);
        })

        .catch(err =>{
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                        message: "Player not found with id " + playerId
                });
            }
            return res.status(500).json({
                    message: "Error retrieving player with id " + playerId
            });
        });

});








router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = getToken(req.headers);
    const player = req.body;

    if(token) {
      if(!player.team_id) {
          return res.status(400).json({
              message: "Player's team cannot be blank"
          });
      }

      if(!player.name) {
          return res.status(400).json({
              message: "Player name cannot be blank"
          });
      }

      if(!player.age) {
          return res.status(400).json({
              message: "Player age cannot be blank"
          });
      }
      if(!player.weight) {
          return res.status(400).json({
              message: "Player weight cannot be blank"
          });
      }
      if(!player.position) {
          return res.status(400).json({
              message: "Player name cannot be blank"
          });
      }
      if(!player.points_scored) {
          return res.status(400).json({
              message: "Player points cannot be blank"
          });
      }


      const newPlayer = new Player(player);

      newPlayer.save()
          .then(data => {
              res.json(data);
            })
          .catch(err => res.status(400).json('Error: ' + err));

        } else {
          return res.status(403).json({success: false, message: 'Unauthorized'})
        }

});







router.route("/:id").put(passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = getToken(req.headers);
    const playerId = req.params.id;
    const newPlayer = req.body;

    if(token){

      if(!newPlayer.name) {
          return res.status(400).json({
              message: "Player name cannot be blank"
          });
      }
      if(!newPlayer.team_id) {
          return res.status(400).json({
              message: "Player's team cannot be blank"
          });
      }
      if(!newPlayer.age) {
          return res.status(400).json({
              message: "Player age cannot be blank"
          });
      }
      if(!newPlayer.weight) {
          return res.status(400).json({
              message: "Player weight cannot be blank"
          });
      }
      if(!newPlayer.position) {
          return res.status(400).json({
              message: "Player name cannot be blank"
          });
      }
      if(!newPlayer.points_scored) {
          return res.status(400).json({
              message: "Player points cannot be blank"
          });
      }

      Player.findByIdAndUpdate(playerId, newPlayer, {new: true})
        .then(player => {
            if(!player) {
                return res.status(404).json({
                    message: "Player not found with id" + playerId
                });
            }
            res.json(player);
        }).catch(err => {

            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                        message: "Player not found with id " + playerId
                });
            }
            return res.status(500).json({
                    message: "Error updating player with id " + playerId
            });
        });

}

else {
    return res.status(403).json({success: false, message: 'Unauthorized'})

}


});




router.route("/:id").delete((req, res) => {
  const playerId = req.params.id;

  Player.findByIdAndRemove(playerId)
    .then(player => {
        if(!player) {
            return res.status(404).json({
                message: "Player not found with id" + playerId
            });
        }
        res.json({message: "Player deleted successfully."});
    }).catch(err => {

        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                    message: "Player not found with id " + playerId
            });
        }
        return res.status(500).json({
                message: "Error updating player with id " + playerId
        });
    });
});







module.exports = router;
