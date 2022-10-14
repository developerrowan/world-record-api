const fetch = require('node-fetch');

const getWorldRecordByTwitchGame = (game) => {
    return new Promise((resolve, reject) => {
        const query = fetch(`https://www.speedrun.com/api_records.php?game=${game}`)
        .then((result) => {
            result.json().then((worldRecords) => {
                if (worldRecords === null || worldRecords.length === 0 || JSON.stringify(worldRecords) === "{}") {
                    return resolve(false);
                }
    
                const game = Object.keys(worldRecords)[0];

                let wr = worldRecords[Object.keys(worldRecords)[0]];

                const category = Object.keys(wr)[0];

                wr = wr[Object.keys(wr)[0]];
    
                const player = wr.player;
                const timeInSeconds = wr.time;
                const time = getFormattedTimeFromSeconds(timeInSeconds);
                const web = wr.links.web;
    
                return resolve({
                    category,
                    game,
                    player,
                    time,
                    timeInSeconds,
                    web
                });
            })
        })
        .catch((err) => {
            console.log(err.message);
            return resolve(false);
        });
    });
};

const getFormattedTimeFromSeconds = (time) => {
    const hours = ~~(time / 3600);
    const minutes = ~~((time % 3600) / 60);
    const seconds = ~~time % 60;

    var result = "";

    if (hours > 0) {
        result += "" + hours + ":" + (minutes < 10 ? "0" : "");
    }

    result += "" + minutes + ":" + (seconds < 10 ? "0" : "");
    result += "" + seconds;
    return result;
};

module.exports = getWorldRecordByTwitchGame;