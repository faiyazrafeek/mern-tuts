const asyncHnadler = require('express-async-handler')

const Goal = require('../model/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHnadler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHnadler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field ')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHnadler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

// @desc    Detele goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHnadler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove

    res.status(200).json({id : req.params.id})
})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}