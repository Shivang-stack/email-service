require("dotenv").config(); // this line should always come first.
const express = require("express");
// body parser is not required
let port=process.env.PORT || 3000;

const app = express();
const sendEmailRoutes = require("./routes/email");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mail Service");
});

app.use("/api", sendEmailRoutes);

app.use((err, req, res, next) => {
  return res.status(400).json({ error: err.message });
});


app.listen(port, () => console.log("Server started..."));
