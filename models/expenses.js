let mongoose = require("mongoose");

// create a model
let expenseModel = mongoose.Schema(
    {
        type: String,
        amount: Number,
        date: String,
    },
    {
        collection: "Spent.expenses"
    }
);

module.exports = mongoose.model("ExpenseTracker", expenseModel);
