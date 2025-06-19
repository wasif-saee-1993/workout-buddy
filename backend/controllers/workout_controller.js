const Workout = require("../models/workout")
const mongoose = require('mongoose')


// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({user_id: req.user._id}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Get a single workout
const getWorkout = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "invalid id"})
        }

        const workout = await Workout.findById(id)
        if (!workout) {
            res.status(404).json({error: "No result found"})
        } else {
            res.status(200).json(workout)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// Create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }

    if(!load) {
        emptyFields.push('load')
    }

    if(!reps) {
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: emptyFields.map( (o) => `${o} is required` ), emptyFields }) 
    }

    try {
        const workout = await Workout.create({title: title, load: load, reps: reps, user_id: req.user._id}) 
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a Workout
const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "invalid id"})
        }

        const workout = await Workout.findOneAndDelete({_id: id})
        if (!workout) {
            res.status(404).json({error: "No result found"})
        } else {
            res.status(200).json(workout)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update a workout
const updateWorkout = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "invalid id"})
        }

        const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body})

        let updatedWorkout = await Workout.findById(id)
        
        if (!workout) {
            res.status(404).json({error: "No result found"})
        } else {
            res.status(200).json(updatedWorkout)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}