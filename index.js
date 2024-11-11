const express = require("express");
const db = require("./db")
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home",(req, res) => {
  res.send("<h1>Welcome Home!</h1>")
})

app.get("/signup", (req, res) => {
  res.render("signup")
});

app.post("/signup", async (req, res) => {
    try {
        const data = {
            email : req.body.email,
            password: req.body.password
        }
        const existingUser = await db.findOne({email : data.email})
        if(existingUser){
          res.send("<h1>User Already Existing</h1>")
        }else{
          const userdata = await db.insertMany(data)
        }
        } catch (error) {
        console.log("Error while accessing database: ", error)
    }
})

app.listen(3000, () => {
  console.log("Server running on port: 3000");
});