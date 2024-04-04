const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Card = require("./db")
const cors = require('cors')


const app = express()
app.use(cors())
app.use(bodyParser.json());


app.get("/api/cards", async (req,res) => {
    try {
        const cards = await Card.find();
        res.json(cards);

    } catch (error) {
            res.status(500).json({ error: 'Internal server error' });

    }
})

app.post("/api/cards", async (req,res) => {
    try {
        const newCard = new Card(req.body);
        await newCard.save();
        console.log(newCard)
        res.status(201).json(newCard);

    } catch (error) {
        res.status(400).json({
            error: "Bad request"
        })
    }
})

app.put("/api/cards/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, socialMedia, interests } = req.body;
  
      // Validate if the provided ID is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid card ID" });
      }
  
      // Find the card by ID and update its fields
      const updatedCard = await Card.findByIdAndUpdate(
        id,
        { name, description, socialMedia, interests },
        { new: true } // Return the updated card
      );
  
      if (!updatedCard) {
        return res.status(404).json({ error: "Card not found" });
      }
  
      res.json(updatedCard); // Return the updated card
    } catch (error) {
      console.error("Error updating card:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
app.delete("/api/cards/:id", async (req,res) => {
  try {
    const deleteCard = await Card.findByIdAndDelete(req.params.id)
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({
        error: "Bad REQUEST"
    }) 
  }
})
app.listen(3001, () => {
    console.log("Server is running on port 3000")
})