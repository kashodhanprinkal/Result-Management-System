const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Print MongoDB connection URI for debugging
console.log('MongoDB Connection URI:', process.env.MONGO_URL);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("NOT CONNECTED TO NETWORK", err));

// Routes
app.use("/", Routes);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
