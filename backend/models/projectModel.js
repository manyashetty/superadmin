const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_image: {
      type: String,
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("projects", projectSchema);
