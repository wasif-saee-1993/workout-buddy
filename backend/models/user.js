const mongoos = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoos.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


// Static signup method
userSchema.statics.signup = async function(email, password) {

    // Validation
    if (!email || ! password) {
        throw Error("Email and password required")
    }

    if (!validator.isEmail(email)) {
        throw Error("Not a valid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong")
    }

    const exists = await this.findOne({ email })
    
    if ( exists ) {
        throw Error("Email already in use")
    }

    // password encryption
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    

    // user creation
    const user = await this.create({ email: email, password: hash })

    return user
}


// static login method
userSchema.statics.login = async function (email, password) {

    // Validation
    if (!email || ! password) {
        throw Error("Email and password required")
    }

    const user = await this.findOne({ email })

    if ( !user ) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (match) {
        return user
    } else {
        throw Error("Incorrect password")
    }
}

module.exports = mongoos.model("User", userSchema)