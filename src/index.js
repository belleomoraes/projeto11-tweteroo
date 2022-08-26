import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let user = [];
const userServer = [];
const tweetServer = []
let tweet = [];

app.post("/sign-up", (req, res) => {
  user = req.body;
  userServer.push(user);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
tweet = req.body;
tweetServer.push(tweet)
console.log(tweetServer)
res.send("OK");
})
app.listen(5000, () => console.log("Listennig on 5000"));
