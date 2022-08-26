import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let user = [];
const userServer = [];
const tweetServer = [];
let tweet = [];

app.post("/sign-up", (req, res) => {
  user = req.body;
  userServer.push(user);
  res.status(200).send("OK");
});

app.post("/tweets", (req, res) => {
  tweet = req.body;
  tweetServer.push(tweet);
  console.log(tweetServer);
  res.status(200).send("OK");
});

app.get("/tweets", (req, res) => {
  let lastTweets = [];
  if (tweetServer.length <= 10) {
    lastTweets = tweetServer;
  } else {
    let positionSlice = teste.length - 10;
    lastTweets = tweetServer.slice(positionSlice);
  }
  console.log(user);
  let lastTweetsAvatar = lastTweets.map((tweet) => {
    tweet.avatar = user.avatar;
    return tweet;
  });
  res.send(lastTweetsAvatar);
});

app.listen(5000, () => console.log("Listenning on 5000"));
