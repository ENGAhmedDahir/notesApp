import mongoose from "mongoose";

const {Schema} = mongoose;

const notesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        validate : [value =>value.length <500 , 'content must be  less than 500 characters']

    },
    author:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Notes = mongoose.model('Notes', notesSchema);
export default Notes;