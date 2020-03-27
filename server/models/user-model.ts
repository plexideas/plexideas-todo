import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  givenName: String,
  familynName: String,
  picture: String,
  token: String,
})

export default mongoose.model("user", userSchema);
