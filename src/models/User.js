const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new Schema({
    name:{type: String, require: true},
    email:{type: String, require: true, unique: true},
    password:{type: String, require: true}
},{
timestamps: true
}) 

//metodo para cifrar la contraseña 
UserSchema.methods.encryptPassword = async password =>{
 const salt = await bcrypt.genSalt(14);
 return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
   };

module.exports = model('user', UserSchema)