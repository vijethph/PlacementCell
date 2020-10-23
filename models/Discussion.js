const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const discussionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});


var Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;