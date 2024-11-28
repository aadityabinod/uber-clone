import mongoose from "mongoose";

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(console.log("connected to DB"))
    .catch(err=> console.log(err)
    )
}

export default connectToDb