const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  name: String,
  content: String,
  date: Date,
  reply: [
    {
      name: String,
      content: String,
      date: Date,
    },
  ],
});

const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        'title': String,
        'slugTitle' : String,
        'content': String,
        'status': String,
        'author': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        'comments': [Comment],
        'categories': [String],
        'tags' : [String],
        'publishedAt': Date,
    },{ timestamps: true })
)

module.exports = Post
