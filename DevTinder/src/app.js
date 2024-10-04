const express = require("express");

const connectDB = require("./config/database");
const User = require("./models/userSchema");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //   console.log(req.body);
  const userObj = req.body;
  //Creating a new instance of the user Model
  const user = new User(userObj);
  try {
    const saveData = await user.save();
    res.send(saveData);
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    if (userEmail) {
      res.send("Provide email");
    }
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    res.status(400).send("Error while getting data");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if(data?.skills?.length > 5){
      throw new Error("Skills Cannot be more than 5")
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(`update successfully ${user}`);
  } catch (error) {
    res.status(400).send(`Update failed: ${error.message}`);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("Delete Successfully");
  } catch (error) {
    res.status(400).send("Error deleting data");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("server is started");
    });
  })
  .catch((err) => {
    console.error("Database connect be connected");
  });
