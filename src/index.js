import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const userServer = [];
const tweetServer = [];

app.post("/sign-up", (req, res) => {
  const { avatar, username } = req.body;
  if (!avatar || !username) {
    res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    return;
  }
  userServer.push({ avatar, username });
  res.status(201).send({ message: "OK" });
});

app.post("/tweets", (req, res) => {
  const { tweet, username } = req.body;
  if (!tweet || !username) {
    res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    return;
  }

  tweetServer.push({ tweet, username });
  res.status(201).send({ message: "OK" });
});

app.get("/tweets", (req, res) => {
  let lastTweets = [];
  if (tweetServer.length <= 10) {
    lastTweets = tweetServer;
  } else {
    let positionSlice = lastTweets.length - 10;
    lastTweets = tweetServer.slice(positionSlice);
  }
  let lastTweetsAvatar = lastTweets.map((tweet) => {
    tweet.avatar = userServer
      .filter((user) => user.username === tweet.username)
      .map((value) => value.avatar);
    return tweet;
  });
  res.send(lastTweetsAvatar);
});

app.get("/tweets/:USERNAME", (req, res) => {
  const USERNAME = req.params.USERNAME;
  const userFind = userServer.find((user) => user.username === USERNAME);
  const tweetsUser = tweetServer
    .filter((tweet) => tweet.username === USERNAME)
    .map((value) => {
      value.avatar = userFind.avatar;
      return value;
    });

  res.send(tweetsUser);
});
app.listen(5000, () => console.log("Listening on 5000"));
