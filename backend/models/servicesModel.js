const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    service_image: {
      type: String,
      required: true,
    },
    service_description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timeseries: true,
  }
);

module.exports = mongoose.model("services", servicesSchema);
