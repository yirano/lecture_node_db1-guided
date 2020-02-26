const express = require("express")
// a knex instance connected to our SQLite database, ready to run commands for us.
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM posts;`
		const posts = await db.select("*").from("posts")

		res.json(posts)
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM posts WHERE id = ? LIMIT 1;`
		// const post = await db.first("*").from("posts").where("id", req.params.id)
		const post = await db.first("*").from("posts").where({ id: req.params.id })

		res.json(post)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		}

		// translates to `INSERT INTO posts (title, contents) VALUES (?, ?);`
		// .insert returns an array of IDs, since we could potentially insert multiple rows at once.
		// we only want the id of the first item inserted, since we're only inserting one item.
		const [id] = await db("posts").insert(payload)
		// get the newly created resource from the database in another request so we can return it.
		const newPost = await db("posts").where("id", id).first()

		res.status(201).json(newPost)
	} catch(err) {
		next(err)
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		}

		// translates to `UPDATE posts SET ? = ? WHERE id = ?`
		await db("posts").where("id", req.params.id).update(payload)
		const post = await db("posts").where("id", req.params.id).first()

		res.json(post)
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		// translates to `DELETE FROM posts WHERE id = ?`
		// DON'T FORGET THE .WHERE OR YOU MIGHT DELETE YOUR ENTIRE TABLE
		await db("posts").where("id", req.params.id).del()

		res.status(204).end()
	} catch(err) {
		next(err)
	}
})

module.exports = router