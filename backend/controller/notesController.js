import Notes from "../models/Notes.js";

export const createNote = async (req, res) => {
    try{
        const currentUser = req.user._id;
       

        const { title, description, } = req.body;
        
        const isNoteExist = await Notes.findOne({ title: title});
        if(isNoteExist){
            return res.status(400).send({ message: "Note already exists" });
        }
        const note = new Notes ({
           title: title,
            description: description,
            author: currentUser,

        })
        await note.save();
        res.status(201).send(note);


    }catch(err){
        res.status(500).send({ message: "An error occurred", error: err.message });
        console.log(err);
    }
}
export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({author: req.user._id}).populate({
            path: 'author',
            model: 'User',
            select: 'name'
        }).sort({createNote: -1});
        res.status(200).send(notes);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred while fetching notes", error: err.message });
    }
}

export const getNote = async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Notes.findById(id);
        if(!note){
            return res.status(404).send({message: 'Not Found'});
        }
        res.status(200).send(note);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while fetching the note", error: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        // console.log(id)
    const {title, description} = req.body;
    if (!title || !description) {
        return res.status(400).send({ message: "Title and description are required" });
    }
    const notes = await Notes.findByIdAndUpdate(
       id,
       { title, description},
       {new : true}
    );
       if(!notes){
        return res.status(404).send({message:'Not Found'});
       }
    res.status(200).send(notes);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while updating the note", error: error.message });
        
    }
}

export const deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
        // console.log(id)
   
    const notes = await Notes.findOneAndDelete(
       id,
    );
       if(!notes){
        return res.status(404).send({message:'Not Found'});
       }
    res.status(200).send({ message: "seccesfully deleted"});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while updating the note", error: error.message });
        
    }
}


