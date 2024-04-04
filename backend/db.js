const mongoose = require("mongoose")

const url = mongoose.connect("mongodb+srv://patidarhimank005:kJeLxV6d050vGdI0@cluster0.usamru0.mongodb.net/cards")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const CardSchema = new mongoose.Schema({
    name: String,
  description: String,
  socialMedia: {
    linkedin: String,
    twitter: String,
  },
  interests: [String],
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;