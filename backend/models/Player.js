/**
 * @Date:   2020-01-14T10:25:11+00:00
 * @Last modified time: 2020-02-15T13:24:02+00:00
 */


const mongoose = require('mongoose');



const  PlayerSchema = new mongoose.Schema({

  team_id:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
  },

  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true   
  },
  weight: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  points_scored: {
    type: Number,
    required: true
  }


});


const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
