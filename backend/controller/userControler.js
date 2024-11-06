import { jwt_Secret } from '../config/config.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists by email or name
        const isUserExist = await User.findOne({
            $or: [
                { email: email.toLowerCase() }, 
                { name: name.toLowerCase() }
            ]
        });

        // If user already exists, return an error
        if (isUserExist) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }

        // If the user doesn't exist, create and save the new user
        const user = new User({
            name: name,
            email: email,
            password: password
        });

        await user.save();

        // Send a success response with the created user
        res.status(201).send(user);
        console.log(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
};

// Login a user
export const login = async  (req , res)=>{
    try{
        const {email, password} = req.body;
        const user= await User.findOne(
            { email: email.toLowerCase()}).select("+password");
        if(!user){
            return res.status(400).send({ message: "inavalid email"});
        };
        const ismatch = await user.comparePassword(password);
        if(!ismatch) {
            return res.status(400).send({ message: "invalid password"});
        }
        // Generate and send the JWT token
        const expiresIn = 60 * 24 * 60 * 60 // 60 or 2 m days
        const token = jwt.sign({ _id: user._id }, jwt_Secret, {
        expiresIn: expiresIn,  // corrected spelling
        })
         res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 24 * 60 * 60 * 1000 // corrected variable name
         })


        user.password = undefined;


        res.status(200).send({...user.toJSON(), expiresIn})
    }catch (error) {
        console.log(error.message);
        res.status(400).send({error: error.message});
    }
}
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ })
        res.status(200).send(users);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred while fetching notes", error: err.message });
    }
}
export const getUser = async (req, res) => {
    try {
        const { id }= req.params
        const user = await User.findById(id).select('-password');
        if(!user) return res.status(404).send({message: 'User not found'})

            res.status(200).send(user)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "An error occurred while fetching user", error: error.message });
        
    }
}


//update name and email
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
  const {name, email} = req.body
  const user = await User.findByIdAndUpdate(
    id,
    { name ,email},
    {new : true}
  )
  if(!user){
    return res.status(404).send({message:'Not Found'});
   }
res.status(200).send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "An error occurred while updating user", error: error.message });
    
  }




}


// update  password

export const updatePassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      
      const user = await User.findById(id).select('+password');;
      if (!user) return res.status(404).send({ message: 'User not found' });
      
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) return res.status(400).send({ message: 'Incorrect current password' });
      
      // Assuming password hashing middleware or manual hashing setup
      user.password = newPassword;
      await user.save();
  
      res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
      console.error("Password update error:", error.message);
      res.status(500).send({ message: "An error occurred while updating the password", error: error.message });
    }
  };
  

