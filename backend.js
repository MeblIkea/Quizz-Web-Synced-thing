const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.post('/data', (req, res) => {
  const data = req.body;

  fs.readFile("stats.json", "utf8", (err, f) => {
  if (err) {
    return;
  }
  let nf = JSON.parse(f)
  nf[data.question][data.answer] += 1

  fs.writeFile("stats.json", JSON.stringify(nf), "utf8", (err) => {console.error(err)})
  });

  res.send('Données reçues avec succès !');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
