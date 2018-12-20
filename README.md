# liri-node-app

### This node.js retrieve the song, movie, artist(Musician) information
### This has 4 commands.

* `concert-this`
This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal

    ex> `node liri.js concert-this <artist/band name here>`

The information will show

    * Name of the venue

    * Venue location

    * Date of the Event (use moment to format this as "MM/DD/YYYY")


* `spotify-this-song`
This will show the information about the song

    ex> `node liri.js spotify-this-song '<song name here>'`

The information will show

    * Artist(s)

    * The song's name

    * A preview link of the song from Spotify

    * The album that the song is from

* `movie-this`
This will output the following information from imdb API

    ex> `node liri.js movie-this '<movie name here>'`

The information will show

    * Title of the movie.

    * Year the movie came out.

    * IMDB Rating of the movie.

    * Rotten Tomatoes Rating of the movie.

    * Country where the movie was produced.

    * Language of the movie.

    * Plot of the movie.

    * Actors in the movie.


* `do-what-it-says`
This will show the information whatever random.txt has. Edit the text in random.txt to test out the feature for other commands(concert-this, spotify-this-song, movie-this)

    ex> `node liri.js do-what-it-says`

LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

## Demo Videos
* (https://drive.google.com/file/d/1-7GiTUbvXTX1vKQ5IlJeh6s4CtcPeY8d/view)