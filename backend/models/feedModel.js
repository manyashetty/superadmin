const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
  }, 
},
{
  timeseries:true,
});



module.exports = mongoose.model("feeds", feedSchema);