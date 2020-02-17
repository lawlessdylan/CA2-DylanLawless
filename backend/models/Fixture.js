/**
 * @Date:   2020-01-14T10:25:11+00:00
 * @Last modified time: 2020-02-12T15:19:22+00:00
 */


const mongoose = require('mongoose');
let Team = require("./Teams");


const  FixtureSchema = new mongoose.Schema({

  date: {
    type: Date,
    required: true
  },
    team_one_id:  {
      type: mongoose.Types.ObjectId,
      ref: 'Team'
  },
  team_two_id:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
},


  result: {
    team_one_score: Number,
    team_two_score: Number
  }


});


const Fixture = mongoose.model('Fixture', FixtureSchema);

module.exports = Fixture;
