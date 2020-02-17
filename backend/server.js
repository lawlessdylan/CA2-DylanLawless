/**
 * @Date:   2020-01-14T09:17:31+00:00
 * @Last modified time: 2020-02-17T14:07:18+00:00
 */
 require('dotenv').config();


const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');

const teamsRouter = require('./routes/teams');
const playersRouter = require('./routes/players');
const fixturesRouter = require('./routes/fixtures');



const app = express();

app.use(body_parser.json());
app.use(cors());
app.use('/teams', teamsRouter);
app.use('/players', playersRouter);
app.use('/fixtures', fixturesRouter);

app.use('/account', authRouter);


const uri = process.env.ATLAS_URI;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true

});

const connection = mongoose.connection;


connection.once('open', () => {
  console.log("mongodb database connection established successfully");
});


app.get("/", (req, res) => {
    res.json({message: "You are in the root route"});
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
