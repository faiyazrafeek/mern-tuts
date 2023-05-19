const asyncHnadler = require('express-async-handler')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHnadler(async (req, res) => {
    res.status(200).json({message : "Get Goals"})
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHnadler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field ')
    }

    res.status(200).json({message : "Set Goal"})
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHnadler(async (req, res) => {
    res.status(200).json({message : `Update Goal ${req.params.id}`})
})

// @desc    Detele goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHnadler(async (req, res) => {
    res.status(200).json({message : `deleted Goal ${req.params.id}`})
})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}