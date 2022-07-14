const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const { Types } = Schema;

const UsersSchema = new Schema({
    name: {
        type: Types.String,
        required: true,
        trim: true
    },
    surname: {
        type: Types.String,
        required: true,
        trim: true
    },
    email: {
        type: Types.String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: Types.String,
        required: true
    },
    photoUrl: {
        type: Types.String,
        trim: true,
        default: null
    }
}, {

    _id: true,
    timestamps: true,
    collection: "users",
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }

})

UsersSchema.pre('save', async function preSave(next) {
    if (this.isNew) {
        try {
            //console.log('Password converting into hash');

            this.password = await bcrypt.hash(this.password, 10)
        }
        catch (err) {
            return next(err);
        }
    }
    next();
})

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
