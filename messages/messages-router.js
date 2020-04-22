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
		// SELECT * FROM "messages" WHERE "id" = ? LIMIT 1;
		// const [message] = await db.select("*").from("messages").where("id", req.params.id).limit(1)
		const message = await db("messages").where("id", req.params.id).first()
		res.json(message)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		}

		// translates to `INSERT INTO "messages" ("title", "contents") VALUES (?, ?);`
		const [id] = await db("messages").insert(payload)
		const message = await db("messages").where("id", id).first()

		res.json(message)
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

		// translates to `UPDATE "messages" SET "title" = ? AND "contents" = ? WHERE "id" = ?;`
		await db("messages").where("id", req.params.id).update(payload)
		const updatedMessage = await db("messages").where("id", req.params.id).first()

		res.json(updatedMessage)
	} catch (err) {
		next(err)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		// translates to `DELETE FROM "messages" WHERE "id" = ?;`
		await db("messages").where("id", req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router