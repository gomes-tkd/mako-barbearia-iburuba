const mongoose = require("mongoose");

async function main() {
    // await mongoose.connect("mongodb://localhost:27017/mako-barbershop");
    await mongoose.connect("mongodb://0.0.0.0:27017/mako");
    console.log("aeee conectou essa desgrama");
}

main().catch(err => console.log(err.message));

module.exports = mongoose;
