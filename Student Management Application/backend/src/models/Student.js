const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: [true, "Name is requred"],
            trim:true,
        },

        email: {
            type: String,
            required:[true, "Email is required"],
            unique:true,
            lowercase:true,
            trim:true,
        },
        password: {
            type: String, 
            required:[true, "Password is required"],
            minlength:6, 
            select:false,
        },
        role: { 
            type: String, 
            enum:['admin', 'user'],
            default:"user",
        },
        status:{
            type: String,
            enum: ["active", "disabled"],
            default:"active",
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
studentSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
studentSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema)