const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea')
const apiRouter = express.Router();
const db = require('./db')

// Minions Router
apiRouter.get('/minions', (req, res) => {
    const all = db.getAllFromDatabase('minions')
    res.status(200).send(all)
})

apiRouter.post('/minions', (req, res) => {
    const minion = db.addToDatabase('minions', req.body)
    res.status(201).send(minion)
})

apiRouter.get('/minions/:minionId', (req, res) => {
    const selectMinion = db.getFromDatabaseById('minions', req.params.minionId);
    if (selectMinion === undefined) {
        res.status(404).send()
    } else {
        res.status(200).send(selectMinion)
    }
})

apiRouter.put('/minions/:minionId', (req, res) => {
    // change id to number
    const minionId = +req.params.minionId;
    if (!Number.isFinite(minionId) || minionId != +req.body.id) {
        res.status(404).send()
    } else {
        const updatedMinion = db.updateInstanceInDatabase('minions', req.body)
        res.status(200).send(updatedMinion)
    } 
})

apiRouter.delete('/minions/:minionId', (req, res) => {
    const deleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send('Succesfully deleted')
    } else {
        res.status(404).send('Resource not found!')
    }
})

// Ideas Router

apiRouter.get('/ideas', (req, res) => {
    const all = db.getAllFromDatabase('ideas')
    res.status(200).send(all)
})

apiRouter.get('/ideas/:ideaId', (req, res) => {
    const selectIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (selectIdea === undefined) {
        res.status(404).send()
    } else {
        res.status(200).send(selectIdea)
    }
})

apiRouter.put('/ideas/:ideaId', (req, res) => {
    // change id to number
    const ideaId = +req.params.ideaId;
    if (!Number.isFinite(ideaId) || ideaId != +req.body.id) {
        res.status(404).send()
    } else {
        const updatedIdea = db.updateInstanceInDatabase('ideas', req.body)
        res.status(200).send(updatedIdea)
    } 
})

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res) => {
    const idea = db.addToDatabase('ideas', req.body)
    res.status(201).send(idea)
})

apiRouter.delete('/ideas/:ideaId', (req, res) => {
    const deleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send('Succesfully deleted')
    } else {
        res.status(404).send('Resource not found!')
    }
})


// Meetings Router
apiRouter.get('/meetings', (req, res) => {
    const all = db.getAllFromDatabase('meetings')
    res.status(200).send(all)
})

apiRouter.post('/meetings', (req, res) => {
    const meeting = db.createMeeting();
    db.addToDatabase('meetings', meeting)
    res.status(201).send(meeting)
})

apiRouter.delete('/meetings', (req, res) => {
    const deleted = db.deleteAllFromDatabase('meetings')
    if (deleted) {
        res.status(204).send('Succesfully deleted')
    } else {
        res.status(404).send('Resource not found!')
    }
})


module.exports = apiRouter;
