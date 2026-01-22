const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9 ]*$/.test(v); //use of regex
      },
      message: "only alphabets and numeric are allow in title"
    },
    required : true

  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["pending", "failed", "success"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},
   { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
