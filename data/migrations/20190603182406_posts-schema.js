exports.up = async (knex) => {
	await knex.schema.createTable("messages", (table) => {
		table.increments()
		table.text("title").notNullable()
		table.text("contents").notNullable()
		table.timestamps(true, true)
	})
}

exports.down = async (knex) => {
	await knex.schema.dropTableIfExists("messages")
}
