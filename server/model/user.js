const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "please input username"],
            unique: true,
        },
        password: {
            type: String,
            require: [true, "Please input password"],
        },
        email: {
            type: String,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please input a valid email",
            ],
            unique: true,
        },
        phone: {
            type: String,
            match: [
                /^[0-9\-\+]{9,15}$/,
                "Please input a valid phone number",
            ],
            unique: true,
        },
        profileImage: {
            type: String,
            default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
        },
        address: {
            type: String,
        },
        accountType: {
            type: [String],
            require: true,
        }
    },
    { timestamps : true}
);

// UserSchema.pre("save", async function () {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//  });

// UserSchema.methods.createJWT = function () {
//     return jwt.sign(
//         {
//             id: this._id, username: this.username, profileImage: this.profileImage
//         },
//             process.env.JWT_SECRET,
//         {
//             expiresIn: process.env.JWT_LIFETIME,
//         }
//     );
// };

// UserSchema.methods.comparePassword = async function (pw) {
//     const isCorrect = await bcrypt.compare(pw, this.password);
//     return isCorrect;
// };

module.exports = mongoose.model("User", UserSchema);