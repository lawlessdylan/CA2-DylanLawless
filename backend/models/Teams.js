/**
 * @Date:   2020-01-14T10:25:11+00:00
 * @Last modified time: 2020-02-15T16:13:42+00:00
 */


const mongoose = require('mongoose');



const  TeamSchema = new mongoose.Schema({

  nation: {
      type: String,
    },

    coach: {
        type: String,
    },
    
    stadium: {
      type: String,
  }


});


const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
