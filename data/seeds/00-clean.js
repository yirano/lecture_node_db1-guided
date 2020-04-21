exports.seed = async (knex) => {
	await knex("messages").truncate()
}
