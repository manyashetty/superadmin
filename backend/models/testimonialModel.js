const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  client_image: {
    type: String,
    required: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  client_company: {
    type: String,
    required: true,
  },
  client_description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
}
})


module.exports = mongoose.model("testimonials", testimonialSchema);