const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Requirements: name, age, gender, profile picture, skills and interests.
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'N/A'],
        default: 'N/A'
    },
    profile_pic: String,
    skills: [String],
    interests: [String],
    community: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
      },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
