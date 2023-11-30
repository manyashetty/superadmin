const testimonialModel = require("../models/testimonialModel");
const multerConfig = require("../middleware/multer");
const { generatePublicPresignedUrl } = require("../middleware/multer");

// Access the 's3' object
const s3 = multerConfig.s3;

// CREATE A TESTIMONIAL CONTROLLER
const createTestimonial = async (req, res) => {
  try {
    testimonialData = req.body;

    const userId = req.user.user_id;

    // Validate required fields
    if (Object.keys(testimonialData).length === 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }
    // Check if the Image has been successfully uploaded
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, msg: "No testimonial image provided" });
    }

    // Generate a pre-signed URL for public access with a 12-hour expiration
    const preSignedUrl = generatePublicPresignedUrl(req.file.key);

    // Create a new testimonial document and save it to the testimonials collection
    const newTestimonial = await testimonialModel.create({
      ...testimonialData,
      user: userId,
      client_image: preSignedUrl,
    });

    return res.status(201).json({
      status: true,
      msg: "Testimonial created successfully",
      data: newTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

// GET ALL TESTIMONIALS
const getTestimonials = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const testimonialId = req.query.testimonialId;
    if (testimonialId) {
      const testimonial = await testimonialModel.find({ _id: testimonialId });
      return res.status(200).send({
        status: true,
        msg: "testimonials retrieved successfully",
        data: testimonial,
      });
    }

    if (!userId) {
      try {
        const testimonials = await testimonialModel.find();

        return res.status(200).send({
          status: true,
          msg: "All testimonials retrieved successfully",
          data: testimonials,
        });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .send({ msg: "Internal server error", status: false });
      }
    }

    const userTestimonials = await testimonialModel.find({ user: userId });

    return res.status(200).json({
      status: true,
      msg: "User testimonials retrieved successfully",
      data: userTestimonials,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};
// delete testimonials

const deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.query.id;

    // Check if the project exists and is associated with the user
    const testimonialToDelete = await testimonialModel.findOne({
      _id: testimonialId,
    });

    if (!testimonialToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "testimonial not found for the user" });
    }

    // Get the image key associated with the project
    const imageKey = testimonialToDelete.client_image;

    await testimonialModel.findByIdAndDelete(testimonialId);

    await deleteImageFromS3(imageKey);

    return res.status(200).json({
      status: true,
      msg: "Testimonial deleted successfully",
      deleted_testimonial: testimonialToDelete,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// Function to delete an image from the S3 bucket
const deleteImageFromS3 = (imageKey) => {
  const params = {
    Bucket: process.env.WASABI_BUCKET,
    Key: imageKey,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// UPDATE A TESTIMONIAL
const updateTestimonial = async (req, res) => {
  try {
    const testimonial_id = req.query.id;
    const testimonialDataToUpdate = req.body;
    const newImageFile = req.file;

    if (!testimonial_id) {
      return res.status(400).json({
        status: false,
        msg: "No userId or testimonailId provided",
      });
    }

    // Check if a new image file has been provided
    if (newImageFile) {
      // Retrieve the existing image key from the database
      const existingTestimonial = await testimonialModel.findById(
        testimonial_id
      );
      const existingImageKey = existingTestimonial.client_image;

      // Delete the old image from S3
      await s3
        .deleteObject({
          Bucket: process.env.WASABI_BUCKET,
          Key: existingImageKey,
        })
        .promise();

      // Generate a pre-signed URL for the new image
      const newImageURL = generatePublicPresignedUrl(newImageFile.key);

      // Update the project data to include the new image URL
      testimonialDataToUpdate.client_image = newImageURL;
    }

    // Construct and update object with only provided fields
    const updateObject = {};
    for (const key in testimonialDataToUpdate) {
      if (testimonialDataToUpdate[key] !== undefined) {
        updateObject[key] = testimonialDataToUpdate[key];
      }
    }

    // Assuming projectModel has an update method
    const updatedTestimonial = await testimonialModel.findByIdAndUpdate(
      testimonial_id,
      updateObject,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res
        .status(404)
        .json({ status: false, msg: "Testimonial not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial,
};
