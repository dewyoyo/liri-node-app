// Read and set environment variables
require("dotenv").config();
// var dotenv = require("dotenv").config();

// Load the fs package to read and write
var fs = require("fs");
// Add the code required to import the `keys.js` file and store it in a variable.
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

// access all of the exports in our keys.js file
var keysNeeded = require("./keys.js");

// Take two arguments.
// The first will be the commands (i.e. "concert-this", "spotify-this-song", etc.)
// The second will be the parameter that will be <artist/band name here>, '<song name here>', etc.
var commands = process.argv[2];
var parameter = process.argv.slice(3).join("+");

// The switch-case will direct which function gets run.
function commandsSelect(comm, para) {

    switch (comm) {
        case "concert-this":
            concert(para);
            break;

        case "spotify-this-song":
            spotify(para);
            break;

        case "movie-this":
            movie(para);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Check out the commands.");
    }

}

function concert(p) {
    // console.log(p);

    //the Bands in Town Artist Events API
    axios.get("https://rest.bandsintown.com/artists/" + p + "/events?app_id=codingbootcamp")
        .then(response => {
            // console.log(response.data);
            // console.log(response.data[0]);

            var userText = "\n------------ the Bands in Town Artist Events -----------------"
                + `\nName of the venue:     ${response.data[0].venue.name}`
                + `\nVenue location:        ${response.data[0].venue.city}, ${response.data[0].venue.country}`
                + `\nDate of the Event:     ${moment(response.data[0].datetime).format("MM/DD/YYYY")}`
                + "\n--------------------------------------------------------------";
            console.log(userText);
            // console.log("============ the Bands in Town Artist Events =================");
            // // * Name of the venue
            // // console.log(response.data[0].venue.name);
            // console.log(`Name of the venue: ${response.data[0].venue.name}`);
            // // * Venue location
            // // console.log(response.data[0].venue.city);
            // // console.log(response.data[0].venue.country);
            // console.log(`Venue location: ${response.data[0].venue.city}, ${response.data[0].venue.country}`);
            // // * Date of the Event (use moment to format this as "MM/DD/YYYY")
            // // console.log(response.data[0].datetime);
            // // console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
            // console.log(`Date of the Event: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}`);
            // console.log("==============================================================");

            // console.log(process.argv);
            // log to the file(log.txt)
            // moment().format("MM/DD/YYYY hh:mm:ss")
            // console.log(moment().format("MM/DD/YYYY hh:mm:ss"));
            fileLogging("\n###########################################" + moment().format("MM/DD/YYYY hh:mm:ss"));
            fileLogging("\nCommand: node liri.js " + process.argv.slice(2));
            fileLogging(userText);
            // fileLogging("============ the Bands in Town Artist Events =================\n");
            // fileLogging(`Name of the venue: ${response.data[0].venue.name}` + "\n");
            // fileLogging(`Venue location: ${response.data[0].venue.city}, ${response.data[0].venue.country}` + "\n");
            // fileLogging(`Date of the Event: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}` + "\n");
            // fileLogging("==============================================================\n");

        })
        .catch(error => {
            console.log(error);
        });

}
function spotify(p) {
    // console.log(p);
    // console.log(process.env.SPOTIFY_ID);
    // console.log(process.env.SPOTIFY_SECRET);
    if (p == "") {
        p = "The Sign by Ace of Base"
        p = p.replace(/ /g, "+");
    }

    var spotify = new Spotify({
        id: keysNeeded.spotify.id,
        secret: keysNeeded.spotify.secret
    });

    // GET https://api.spotify.com/v1/search
    // GET https://api.spotify.com/v1/albums/{id}
    // GET https://api.spotify.com/v1/albums/{id}/tracks

    // spotify
    // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    // .then(function(data) {
    //   console.log(data); 
    // })
    // .catch(function(err) {
    //   console.error('Error occurred: ' + err); 
    // });

    // search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

    spotify
        //   .search({ type: 'album', query: p , limit: 3})
        .search({ type: 'track', query: p })
        // .search({ type: 'playlist', query: p })
        .then(function (response) {
            // console.log(response);
            // console.log(response.tracks.items);

            var userText = "\n--------------------- Song from Spotify ----------------------"
                + `\nArtist(s): ${response.tracks.items[0].artists[0].name}`
                + `\nThe song's name: ${response.tracks.items[0].name}`
                + `\nA preview link of the song from Spotify: ${response.tracks.items[0].preview_url}`
                + `\nThe album that the song is from: ${response.tracks.items[0].album.name}`
                + "\n--------------------------------------------------------------"
            console.log(userText);

            // console.log("===================== Song from Spotify ======================");
            // // * Artist(s)      
            // // console.log(response.tracks.items[0].artists[0].name);
            // console.log(`Artist(s): ${response.tracks.items[0].artists[0].name}`);
            // // // * The song's name
            // // console.log(response.tracks.items[0].name);
            // console.log(`The song's name: ${response.tracks.items[0].name}`);
            // // // * A preview link of the song from Spotify
            // // console.log(response.tracks.items[0].preview_url);
            // console.log(`A preview link of the song from Spotify: ${response.tracks.items[0].preview_url}`);
            // // // * The album that the song is from
            // // console.log(response.tracks.items[0].album.name);
            // console.log(`The album that the song is from: ${response.tracks.items[0].album.name}`);
            // console.log("==============================================================");

            // console.log(response.playlists);
            // // * Artist(s)
            // console.log(response.playlists.items.artists);
            // // * The song's name
            // console.log(response.playlists.items.name);
            // // * A preview link of the song from Spotify
            // console.log(response.playlists.items.name);
            // // * The album that the song is from

            fileLogging("\n###########################################" + moment().format("MM/DD/YYYY hh:mm:ss"));
            fileLogging("\nCommand: node liri.js " + process.argv.slice(2));
            fileLogging(userText);

        })
        .catch(function (err) {
            console.log(err);
        });


}
function movie(p) {
    // console.log(p);
    if (p == "") {
        p = "Mr. Nobody."
        p = p.replace(/ /g, "+");
    }
    // console.log(p);

    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t=" + p + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response.data);
            var userText = "\n---------------------- Movie Information ----------------------"
                + `\nTitle of the movie: ${response.data.Title}`
                + `\nYear the movie came out: ${response.data.Year}`
                + `\nIMDB Rating of the movie: ${response.data.Rated}`
                + `\nRotten Tomatoes Rating of the movie: ${response.data.Ratings[1].Value}`
                + `\nCountry where the movie was produced: ${response.data.Country}`
                + `\nLanguage of the movie: ${response.data.Language}`
                + `\nPlot of the movie: ${response.data.Plot}`
                + `\nActors in the movie: ${response.data.Actors}`
                + "\n--------------------------------------------------------------";
            console.log(userText);

            // console.log("====================== Movie Information ======================");
            // // * Title of the movie.
            // // console.log(response.data.Title);
            // console.log(`Title of the movie: ${response.data.Title}`);
            // // fileLogging("Title : ");
            // // fileLogging(response.data.Title);
            // // * Year the movie came out.
            // // console.log(response.data.Year);
            // console.log(`Year the movie came out: ${response.data.Year}`);
            // // * IMDB Rating of the movie.
            // // console.log(response.data.Rated);
            // console.log(`IMDB Rating of the movie: ${response.data.Rated}`);
            // // * Rotten Tomatoes Rating of the movie.
            // // console.log(response.data.Ratings[1].Value);
            // console.log(`Rotten Tomatoes Rating of the movie: ${response.data.Ratings[1].Value}`);
            // // * Country where the movie was produced.
            // // console.log(response.data.Country);
            // console.log(`Country where the movie was produced: ${response.data.Country}`);
            // // * Language of the movie.
            // // console.log(response.data.Language);
            // console.log(`Language of the movie: ${response.data.Language}`);
            // // * Plot of the movie.
            // // console.log(response.data.Plot);
            // console.log(`Plot of the movie: ${response.data.Plot}`);
            // // * Actors in the movie.
            // // console.log(response.data.Actors);
            // console.log(`Actors in the movie: ${response.data.Actors}`);
            // console.log("==============================================================");
            fileLogging("\n###########################################" + moment().format("MM/DD/YYYY hh:mm:ss"));
            fileLogging("\nCommand: node liri.js " + process.argv.slice(2));
            fileLogging(userText);
        }
    );
}
function doWhatItSays() {
    // We will read the existing random.txt file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break down data inside the file
        data = data.split(",");
        data[1] = data[1].substr(1, data[1].length - 2);
        data[1] = data[1].replace(/ /g, "+");
        console.log(data[0]);
        console.log(data[1]);

        commandsSelect(data[0], data[1]);
    });
}

function fileLogging(text) {
    // fs.appendFile("log.txt", text, function (err) {

    //     // If an error was experienced we will log it.
    //     if (err) {
    //         console.log(err);
    //     }

    //     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    //     // else {
    //     //     console.log("Content Added!");
    //     // }

    // });
    // Synchronously:
    fs.appendFileSync('log.txt', text, function (err) {
        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
    });

}

// execute the command from the console
commandsSelect(commands, parameter);

