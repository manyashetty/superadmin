const contactModel = require("../models/contactModel");

// Controller function to handle contact form submissions
const submitContactForm = async (req, res) => {
  try {
    const userId = req.user.user_id;
    // Extract contact form data from the request body
    const formData = req.body;

    // Check if any data is provided in the request
    if (!formData) {
      return res
        .status(400)
        .send({ status: false, msg: "No form data provided" });
    }

    // Create a new contact document and save it to the contact_collection
    const newContact = await contactModel.create({
      user: userId,
      ...formData,
    });

    return res.status(201).send({
      status: true,
      msg: "Contact form submitted successfully",
      data: newContact,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ status: false, msg: "Internal server error" });
  }
};

//DISPLAY CONTACT FORM
const displayForm = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const contactData = await contactModel.find({
      user: userId,
    });

    if (!contactData) {
      return res.status(401).send({
        status: false,
        msg: "No contact form found",
      });
    }
    return res.status(200).send({
      status: true,
      msg: "Contact form retrieved successfully",
      form: contactData,
    });
  } catch (error) {
    res.status(500).send({ status: false, msg: "Internal server errrr" });
  }
};

module.exports = {
  submitContactForm,
  displayForm,
};
