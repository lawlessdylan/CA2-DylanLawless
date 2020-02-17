/**
 * @Date:   2020-01-14T10:43:43+00:00
 * @Last modified time: 2020-02-15T15:44:44+00:00
 */

//
const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);


let Fixture = require('../models/Fixture');


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

//get all fixtures
router.route('/').get((req, res) => {
  Fixture.find().populate('team_one_id').populate('team_two_id')
  .then(fixtures => res.json(fixtures))
  .catch(err => res.status(400).json('Error: ' + err));


});
//get fixture by id
router.route("/:id").get((req, res) => {

  const fixtureId = req.params.id;

    Fixture .findById(fixtureId).populate('team_one_id').populate('team_two_id')
        .then(result => {
            if(!result){
                return res.status(404).json({
                        message: "Fixture not found with id " + fixtureId
                });
            }
            res.json(result);
        })

        .catch(err =>{
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                        message: "Fixture not found with id " + fixtureId
                });
            }
            return res.status(500).json({
                    message: "Error retrieving fixture with id " + fixtureId
            });
        });

});


router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = getToken(req.headers);
    const fixture = req.body;

    if(token) {
        if(!fixture.result) {
            return res.status(400).json({
                message: "Fixture name cannot be blank"
            });
        }
        if(!fixture.date) {
            return res.status(400).json({
                message: "Fixture's date cannot be blank"
            });
        }
        if(!fixture.team_one_id) {
            return res.status(400).json({
                message: "Fixture's team two cannot be blank"
            });
        }
        if(!fixture.team_two_id) {
            return res.status(400).json({
                message: "Fixture's team two cannot be blank"
            });
          }



          const newFixture = new Fixture(fixture);

          newFixture.save()
            .then(data => {
              res.json(data)
            })
            .catch(err => res.status(400).json('Error: ' + err));

        } else {
          return res.status(403).json({success: false, message: 'Unauthorized'})
        }

});








//edit fixture
router.route("/:id").put(passport.authenticate('jwt', { session: false }), (req, res) => {

    const token = getToken(req.headers);
    const fixtureId = req.params.id;
    const newFixture = req.body;

    if(token) {
          if(!newFixture.result) {
              return res.status(400).json({
                  message: "Fixture name cannot be blank"
              });
          }
          if(!newFixture.date) {
              return res.status(400).json({
                  message: "Fixture's date cannot be blank"
              });
          }
          if(!newFixture.team_one_id) {
              return res.status(400).json({
                  message: "Fixture's team two cannot be blank"
              });
          }
          if(!newFixture.team_two_id) {
              return res.status(400).json({
                  message: "Fixture's team two cannot be blank"
              });
            }

            Fixture.findByIdAndUpdate(fixtureId, newFixture, {new: true})
              .then(fixture => {
                  if(!fixture) {
                      return res.status(404).json({
                          message: "fixture not found with id" + fixtureId
                      });
                  }
                  res.json(fixture);
              }).catch(err => {

                  if(err.kind === 'ObjectId') {
                      return res.status(404).json({
                              message: "fixture not found with id " + fixtureId
                      });
                  }
                  return res.status(500).json({
                          message: "Error updating fixture with id " + fixtureId
                  });
              });




        } else {

            return res.status(403).json({success: false, message: 'Unauthorized'});

        }
});



//delete fixture
router.route("/:id").delete(passport.authenticate('jwt', { session: false }), (req, res) => {

    const token = getToken(req.headers);
    const fixtureId = req.params.id;
    if (token){

      Fixture.findByIdAndRemove(fixtureId)
        .then(fixture => {
            if(!fixture) {
                return res.status(404).json({
                    message: "Fixture not found with id" + fixtureId
                });
            }
            res.json({message: "Movie deleted successfully"});
        }).catch(err => {

            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                        message: "Fixture not found with id " + fixtureId
                });
            }
            return res.status(500).json({
                    message: "Error updating fixture with id " + fixtureId
            });
        });

    } else {
        return res.status(403).json({success: false, message: 'Unauthorized'});

    }
});



module.exports = router;
