require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWorldRecordByTwitchGame = require('./world-record.service.js');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.get('/worldrecord/:gameName', (req, res) => {
    const gameName = req.params.gameName;

    getWorldRecordByTwitchGame(gameName).then((worldRecord) => {
        if(worldRecord === false) {
            res.status(500).send('Failed to fetch world record.');
            return;
        }

        res.json(worldRecord);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;