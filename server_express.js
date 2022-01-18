const express = require("express");
const logger = require("./middleware/logger");
const path = require("path");
const exphbs = require("express-handlebars");

const members = require("./data_members");

//init express
let app = express();

const PORT = process.env.PORT || 8080;

//Handlebars Middleware
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//Init Middleware
// app.use(logger);

//Init Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HomePage Router
app.get("/", (req, res) => {
  res.render("index", {
    title: "Members App 2.0",
    members,
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API routes
app.use("/api/members", require("./routes/api/members"));
app.use("/api/employes", require("./routes/api/employe_inss"));

//Listen on port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
