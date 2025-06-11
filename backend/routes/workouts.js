const express = require("express")
const Workout = require('../models/workout')
const router = express.Router()
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}   = require("../controllers/workout_controller")
const requireAuth = require("../middleware/requireAuth")

// require auth for all workout routes 
router.use(requireAuth)

// Get all workouts
router.get("/", getWorkouts)


// Get single workout
router.get('/:id', getWorkout)


// POST a single workout
router.post('/', createWorkout)

// DELETE a single workout
router.delete('/:id', deleteWorkout)

// UPDATE a single workout
router.patch('/:id', updateWorkout)


module.exports = router