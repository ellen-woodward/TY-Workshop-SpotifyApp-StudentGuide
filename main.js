// Ask Spotify for an access token
// Don't worry if this is confusing! It is very advanced so we are giving it to you!
// The token tells the Spotify API that we are a valid user with an account
function getAccessToken() {
  const CLIENT_ID = "";
  const CLIENT_SECRET = "";

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.access_token;
    });
}

// This function call out to our API and gets our song data from it
async function getData() {
  // First, we need to get our search query from the HTML
  // Hint: Point the code to the HTML search box and get out the value (document.getElementById)
  // const query = ....

  // This bit might be a bit confusing, but we are teling the API what we want it to search for and how many tracks to give us back
  const URL = "https://api.spotify.com/v1/search?q=";
  const token = await getAccessToken();

  data = await fetch(URL + encodeURIComponent(query) + "&type=track&limit=6", {
    headers: { Authorization: "Bearer " + token },
  })
    // This puts the data into JSON format, which makes it super easy for us to work with
    .then((response) => response.json())
    // Now lets display this data!
    .then((response) => displayData(response));
}

function displayData(response) {
  // How can we link up our data from our API to our HTML?

  // First make the placholder disappear (Hint: look at CSS display)

  // Next fill in 6 song cards with data from Spotify
  // Remember to start from an index of 0!

  // Here's how to get the first song to get you started!
  const song_name_0 = response.tracks.items[0].name;
  const artist_name_0 = response.tracks.items[0].artists[0].name;
  const album_img_0 = response.tracks.items[0].album.images[0].url;
  document.getElementById("song_name_0").textContent = song_name_0;
  document.getElementById("artist_name_0").textContent = artist_name_0;
  document.getElementById("album_img_0").src = album_img_0;
  const link_0 = document.getElementById("link_0");
  link_0.href = response.tracks.items[0].external_urls.spotify;

  // Repeat for the rest of the tracks (Hint: track_1 → track_5)

  // Finally, show the results section
  document.getElementById("parent").style.display = "";
}
