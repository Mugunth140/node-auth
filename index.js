const express = require("express");
const db = require("./db")
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
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
          res.status(300).send("<h1>User Already Exist's</h1>")
        }else{
          const userdata = await db.insertMany(data)
          res.status(201).send("<h1>User Created sucessfully</h1>")
        }
        } catch (error) {
        console.log("Error while accessing database: ", error)
        res.status(500).error("Internal Server error",error)

    }
})

app.post('/login', async (req, res) => {
    try {
      const  data = {
        email : req.body.email,
        password : req.body.password
      }
       
      const userEmail = await db.findOne({email : data.email})
      const userPassword = await db.findOne({password : data.password})
       
      userEmail && userPassword ? res.send("home page").status(200) : res.send("Invalid Email Or Password").status(404)

    } catch (err) {
      console.log('Error while requesting to login: ',err)
    }
})

app.listen(3000, () => {
  console.log("Server running on port: 3000");
});