const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: String,
    email: String,
    mobile: Number,
    designation: String,
    image: String,
    course: String,
    gender: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: String,
        default: () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
            const day = String(today.getDate()).padStart(2, "0");
            return `${day}-${month}-${year}`; // Format: YYYY-MM-DD
        },
    },
});

module.exports = mongoose.model("Employee", employeeSchema);
