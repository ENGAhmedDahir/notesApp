import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type : 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        validate: [validator.isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: {
          validator: (value) => validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
          message: 'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.'
        }
      },
     

},
{
    timestamps: true 
})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    
    const  salt =  await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password, salt);

    next();
})

userSchema.methods.comparePassword = async function(givenPassword){
    return await bcrypt.compare(givenPassword, this.password)
}

const User = mongoose.model("User", userSchema);
export default User;