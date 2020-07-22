const express = require('express')
const db = require('../data/config')

const router = express.Router()
router.get('/', async (req, res, next) => {
  try {
    // translates to SELECT * FROM "messages";
    const messages = await db.select('*').from('messages')
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // SELECT * FROM "messages" WHERE "Id" = ?;
    // destructure the result since we only care about the first index of the array
    const [message] = await db
      .select('*')
      .from('messages')
      .where('id', req.params.id)
      // make sure we're only getting a single result
      // since we're destructuring the array above
      .limit(1)

    res.json(message)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // INSERT INTO <table> (<columns>) VALUES (<values>);
    const payload = {
      // the database will automatically generate the ID and dates
      title: req.body.title,
      contents: req.body.contents
    }
    const [messageID] = await db
      .insert(payload)
      .into('messages')

    const message = await db
      .first('*') // automatically destructures and sends first array item
      .from('messages')
      .where('id', messageID)

    res.status(201).json(message)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    // UPDATE 'messages' SET ? = ? WHERE "id" = ?;
    const payload = {
      // the database will automatically generate the ID and dates
      title: req.body.title,
      contents: req.body.contents
    }
    await db('messages').update(payload).where('id', req.params.id)
    const message = await db.first('*').from('messages').where('id', req.params.id)

    res.json(message) // status 200 for updates
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    // DELETE FROM 'messages' WHERE "id" = ?;
    await db('messages').where('id', req.params.id).del()
    // since we no longer have a resource to return
    // just send a 204 which means 'success, but no res data is being sent back'
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router