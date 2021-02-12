const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];

console.log("Path: ", path);
console.log("Ny commit!!!!");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  // E:/Google Drive/Prosjekter/Software Development/ReactNode/react-nodejs-example/
  console.log("Root dirname: ", ___dirname);
  // res.sendFile('E:/Google Drive/Prosjekter/Software Development/ReactNode/react-nodejs-example/my-app/build/index.html'); // Denne måten å gjøre det på fungerer fint lokalt
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
