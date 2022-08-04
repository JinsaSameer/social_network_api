const { Schema,model, Types } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate:{
          validator:validator.isEmail,
          message: '{value} is not a valid email',
      }
    },
    thoughts: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Thought' }],
     
      friend:[{
        type:Schema.Types.ObjectId,
        ref:'User'}],
      },
   { 
  
     toJSON: {
      getters: true,
    },
    id: false,
  }
);
userSchema
  .virtual('friendCount').get(function () {
    return this.friends.length;
  })


const User = model('User', userSchema);

module.exports = User;

