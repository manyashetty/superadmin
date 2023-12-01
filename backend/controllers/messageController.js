const Message = require('../models/messageModel');

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postNewMessage = async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Both name and message are required' });
  }

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();

    // Emit the new message to all connected clients
    req.io.emit('message', newMessage);

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllMessages, postNewMessage };
