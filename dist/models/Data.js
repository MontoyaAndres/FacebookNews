"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const data = mongoose.model("data", dataSchema);
exports.default = data;
//# sourceMappingURL=Data.js.map