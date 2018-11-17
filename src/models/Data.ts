import * as mongoose from "mongoose";

export interface IDataModel extends mongoose.Document {
  user: string;
  password: string;
}

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

const data = mongoose.model<IDataModel>("data", dataSchema);

export default data;
