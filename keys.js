console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};


// // module.exports is essentially an object that we can add data or variables to
// // We can access them from other files using the 'require' keyword.

// module.exports = {
//   essentials: essentials,
//   niceToHaves: niceToHaves
// };
// // Using the require keyword lets us access all of the exports
// // in our ess.js file
// var stuffINeed = require("./ess.js");
