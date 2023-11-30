const feedModel = require("../models/feedModel");
const multerConfig = require("../middleware/multer");
const { generatePublicPresignedUrl } = require("../middleware/multer");

// Access the 's3' object
const s3 = multerConfig.s3;

// CREATE A FEEDS CONTROLLER

const createFeeds = async (req, res) => {
  try {
    let feedsData = req.body;

    const userId = req.user.user_id;

    if (Object.keys(feedsData).length === 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }

    // Check if the object has been successfully uploaded
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, msg: "No project image provided" });
    }

    const preSignedUrl = generatePublicPresignedUrl(req.file.key);

    let saveFeeds = await feedModel.create({
      ...feedsData,
      user: userId,
      image: preSignedUrl,
    });
    return res.status(201).send({
      status: true,
      msg: "feed upload success",
      data: saveFeeds,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error", staus: false });
  }
};

//DISPLAY ALL THE FEEDS OF LOGGED IN USER

const getFeeds = async (req, res) => {
  try {
    
    const serviceId = req.query.serviceId;

    const userId = req.user.user_id;

    if(!userId){
      try {
        const feedData = await feedModel.find();
    
        if (!feedData) {
          return res.status(404).json({
            status: false,
            msg: "No feed found",
          });
        }
    
        return res.status(200).json({
          status: true,
          msg: "Feeds retrieved successfully",
          data: feedData,
        });
      } catch (error) {
        return res.staus(500).json({
          status: false,
          msg: "Internal server error",
        });
      }
    }

    const userFeeds = await feedModel.find({ user: userId });

    return res.status(200).json({
      status: true,
      msg: "User feeds retrieved successfully",
      data: userFeeds,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

//DELETE A FEED

const deleteFeed = async (req, res) => {
  try {
    const feedId = req.query.id;

    // Check if the project exists and is associated with the user
    const feedToDelete = await feedModel.findOne({
      _id: feedId,
    });

    if (!feedToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "feed not found for the user" });
    }

    // Get the image key associated with the project
    const imageKey = feedToDelete.image;

    await feedModel.findByIdAndDelete(feedId);

    // Delete the image from the S3 bucket
    await deleteImageFromS3(imageKey);

    return res.status(200).json({
      status: true,
      msg: "Feed deleted successfully",
      deleted_feed: feedToDelete,
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


// UPDATE A FEED
const updateFeed = async (req, res) => {
  try {
    const feed_id = req.query.id;
    const feedDataToUpdate = req.body;
    const newImageFile = req.file;

    if (!feed_id) {
      return res.status(400).json({
        status: false,
        msg: "No userId or feedId provided",
      });
    }

     // Check if a new image file has been provided
     if (newImageFile) {
      // Retrieve the existing image key from the database
      const existingFeed = await feedModel.findById(feed_id);
      const existingImageKey = existingFeed.image;

      // Delete the old image from S3
      await s3.deleteObject({ Bucket: process.env.WASABI_BUCKET, Key: existingImageKey }).promise();

      // Generate a pre-signed URL for the new image
      const newImageURL = generatePublicPresignedUrl(newImageFile.key);
     
      // Update the project data to include the new image URL
      feedDataToUpdate.image = newImageURL;
    }

    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in feedDataToUpdate) {
      if (feedDataToUpdate[key] !== undefined) {
        updateObject[key] = feedDataToUpdate[key];
      }
    }

    // Assuming projectModel has an update method
    const updatedFeed = await feedModel.findByIdAndUpdate(
      feed_id,
      updateObject,
      { new: true }
    );

    if (!updatedFeed) {
      return res.status(404).json({ status: false, msg: "Feed not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Feed updated successfully",
      data: updatedFeed,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

// DISPLAY ALL THE FEEDS IN FEED MODEL



module.exports = { createFeeds, getFeeds, deleteFeed, updateFeed };
