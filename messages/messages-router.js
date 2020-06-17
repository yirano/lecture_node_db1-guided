const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "messages";`
		const messages = await db.select("*").from("messages")

		res.json(messages)
	} catch (err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "messages" WHERE "id" = ? LIMIT 1;`
		// descructure the result since we only care about the first index of the array
		const [message] = await db
			.select("*")
			.from("messages")
			.where("id", req.params.id)
			// make sure we're only getting a single result,
			// since we're destructuring the array above
			.limit(1)

		res.json(message)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const payload = {
			// the database will automatically generate the ID and dates
			title: req.body.title,
			contents: req.body.contents,
		}

		// translates to `INSERT INTO "messages" ("title", "contents") VALUES (?, ?);`
		const [messageID] = await db.insert(payload).into("messages")
		// calling `.first()` is doing the same thing as `.limit(1)` and destructuring the result
		const message = await db.first("*").from("messages").where("id", messageID)

		res.status(201).json(message)
	} catch (err) {
		next(err)
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		}

		// translates to `UPDATE "messages" SET ? = ? WHERE "id" = ?;`
		await db("messages").update(payload).where("id", req.params.id)
		const message = await db.first("*").from("messages").where("id", req.params.id)

		res.json(message)
	} catch (err) {
		next(err)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		// translates to `DELETE FROM "messages" WHERE "id" = ?;`
		await db("messages").where("id", req.params.id).del()
		// since we no longer have a resource to return,
		// just send a 204 which means "success, but no response data is being sent back"
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router