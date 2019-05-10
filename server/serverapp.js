const express = require('express');
const app = express()
app.use(express.json());

const {Pool} = require('pg')
var pool = new Pool({
  host: 'localhost',
  database: 'sffilms'
})

const PORT = process.env.PORT || 3009
app.listen(PORT, console.log(`Server is on port ${PORT}👾`))


app.use(express.static('data'))


//homepage
app.get('/', async (req, res) => {
  const client = await pool.connect();
  var showAll = await client.query('SELECT * FROM media ORDER BY id ASC;');
  // console.log(showAll)
  client.release()
  res.json(showAll.rows);
});

app.get('/API/AllTitles', async (req, res) => {
  const client = await pool.connect();
  var showAllTitles = await client.query('SELECT id, title FROM media ORDER BY title ASC;');
  // console.log(showAllTitles)
  client.release()
  res.json(showAllTitles.rows);
});

app.get('/API/AllActors', async (req, res) => {
  const client = await pool.connect();
  var showAllActors = await client.query('SELECT id, title, actor_1,actor_2,actor_3 FROM media ORDER BY actor_1,actor_2,actor_3 ASC;');
  client.release()
  res.json(showAllActors.rows);
});

app.get('/API/AllActors/:actor', async (req, res) => {
  // console.log("qqq")
  const client = await pool.connect();
  var decodedURI = decodeURIComponent(req.params.actor)
  // decodedURI = decodeURIComponent("Dominic%20Cooper")
  // console.log("??",decodedURI)
  var showTourByTitle = await client.query('SELECT id, title, lat, lng FROM media WHERE actor_1 = \''+ decodedURI + '\' OR actor_2 = \'' + decodedURI + '\' OR actor_3 = \'' + decodedURI + '\';');
  // console.log("rowwws",showTourByTitle.rows)
  client.release()
  res.json(showTourByTitle.rows);
});

app.get('/API/AllTitles/:title', async (req, res) => {
  // console.log("qqq")
  const client = await pool.connect();
  var decodedURI = decodeURIComponent(req.params.title)
  // decodedURI = decodeURIComponent("Dominic%20Cooper")
  // console.log("??",decodedURI)
  const query = 'SELECT id, title, lat, lng FROM media WHERE title = \''+ decodedURI +'\';'
  // console.log("😳",query)
  const showTourByTitle = await client.query(query);
  // console.log("rowwwwwwwwwwwws",showTourByTitle.rows)
  client.release()
  res.json(showTourByTitle.rows);
});

// for markers
app.get('/API/LatLng', async (req, res) => {
  const client = await pool.connect();
  var showLatLng = await client.query('SELECT id, title, lat, lng FROM media ORDER BY title ASC;');
  client.release()
  res.json(showLatLng.rows);
});

app.get('/hello', async (req, res) => {
  res.json({Hello:"WORLD"});
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
      res.sendFile(path.join(__dirname, "../client/build", "index.html"))
    }
