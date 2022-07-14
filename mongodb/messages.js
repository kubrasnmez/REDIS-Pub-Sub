const mongoose = require("mongoose");

const { Schema } = mongoose;

const { Types } = Schema;

const { ObjectId } = Types;

const MessagesShema = new Schema({
    from: {
        type: ObjectId,
        ref: "Users",
        required: true
    },
    to: {
        type: ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: Types.String,
        required: true,
        trim: true
    }
}, {
    _id: true,
    timestamps: true,
    collection: "messages",
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }

})

const Messages = mongoose.model("Messages", MessagesShema);

module.exports = Messages;