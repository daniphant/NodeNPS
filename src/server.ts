import express from "express";

const app = express();

app.get("/", request => {
  if (request.destroyed == true) console.log("test");
});

app.listen(3333);
