// controllers/commentController.js
const Comment = require('../model/Comment')

// Handle POST request to save a new comment
const postComment = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const newComment = new Comment({ name, email, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    postComment
}
