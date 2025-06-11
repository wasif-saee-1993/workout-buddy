const express = require("express")

const { signupUser, loginUser } = require("../controllers/user_controller")

const router = express.Router()

// Login Route
router.post('/login', loginUser )

// signup route
// Login Route
router.post('/signup', signupUser)

module.exports = router