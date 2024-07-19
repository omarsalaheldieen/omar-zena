const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Load employees
app.get("https://omar-zena.vercel.app/employees", (req, res) => {
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading employees data");
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Save new employee
app.post("/employees", (req, res) => {
  const newEmployee = req.body;
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading employees data");
      return;
    }
    const employees = JSON.parse(data);
    employees.push(newEmployee);
    fs.writeFile("employees.json", JSON.stringify(employees, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error saving new employee");
        return;
      }
      res.send(newEmployee);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
