exports.seed = async (knex) => {
	await knex("messages").insert([
		{ title: "Message 1", contents: "Let your workings remain a mystery. Just show people the results." },
		{ title: "Message 2", contents: "True mastery can be gained by letting things go their own way. It can't be gained by interfering." },
		{ title: "Message 3", contents: "Not-knowing is true knowledge. Presuming to know is a disease." },
		{ title: "Message 4", contents: "Success or failure: which is more destructive?" },
		{ title: "Message 5", contents: "When two great forces oppose each other the victory will go to the one that knows how to yield." },
		{ title: "Message 6", contents: "Things arise and she let's them come; things disappear and she let's them go." },
		{ title: "Message 7", contents: "A good travel has no fixed plans and is not intent upon arriving. A good artist lets his intuition lead him where ever it wants." },
		{ title: "Message 8", contents: "When you look for it, there is nothing to see. When you listen for it, there is nothing to hear. When you use it, it is inexhaustible." },
		{ title: "Message 9", contents: "She acts without expectation, succeeds without taking credit and doesn't think she is better than anyone else." },
		{ title: "Message 10", contents: "Act without doing; work without effort." },
		{ title: "Message 11", contents: "Do you have the patience to wait until your mud settles and the water is clear? Can you remain unmoving until the right action arises by itself?" },
		{ title: "Message 12", contents: "He who tries to shine dims his own light. He who defines himself can't know who he really is. He who clings to his work will do nothing that endures. Just do your job, then let go." }
	])
}
