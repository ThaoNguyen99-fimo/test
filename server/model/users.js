import mongoose from 'mongoose'
const schema = mongoose.Schema

const User = new schema({
    name: { type: String} ,
    username: { type: String},
    email: { type: String},
    password: { type: String}
})

module.exports = mongoose.model('User', User)