import { expressjwt } from "express-jwt";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.listen(8000, () => {
  console.log("App listening on port 8000...");
});

app.get("/loginadmin", (req, res) => {
  res.json(jwt.sign(JSON.stringify("true"), "sec123"));
});

app.get("/loginuser", (req, res) => {
  res.json(jwt.sign(JSON.stringify("false"), "sec123"));
});

app.get(
  "/needsauth",
  expressjwt({ secret: "sec123", algorithms: ["HS256"] }),
  function (req, res) {
    if (JSON.parse(req.auth) === "false") return res.sendStatus(401);
    res.sendStatus(200);
  }
);
