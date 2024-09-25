const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDB, getDb } = require("./db");

// Create an express app
const app = express();
app.use(express.json());

let db;

// Connect to the database
connectToDB((err) => {
	if (!err) {
		app.listen(3000, () => {
			console.log("Server is running on port 3000");
		});
		db = getDb();
	}
});

// routes
app.get("/books", (req, res) => {
	const page = req.query.p || 0;
	const booksPerPage = 3;

	let books = [];

	db.collection("books")
		.find()
		.sort({ author: 1 })
		.skip(page * booksPerPage)
		.limit(booksPerPage)
		.forEach((book) => {
			books.push(book);
		})
		.then(() => {
			res.status(200).json(books);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ msg: "Error fetching books" });
		});
});

app.get("/books/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("books")
			.findOne({ _id: new ObjectId(req.params.id) })
			.then((book) => {
				if (book) {
					res.status(200).json(book);
				} else {
					res.status(404).json({ msg: "Book not found" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ msg: "Error fetching book" });
			});
	} else {
		res.status(500).json({ msg: "Invalid id" });
	}
});

app.post("/books", (req, res) => {
	const book = req.body;
	db.collection("books")
		.insertOne(book)
		.then((result) => {
			return db.collection("books").findOne({ _id: result.insertedId });
		})
		.then((insertedBook) => {
			res.status(201).json(insertedBook);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ msg: "Error inserting book" });
		});
});

app.delete("/books/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("books")
			.deleteOne({ _id: new ObjectId(req.params.id) })
			.then((result) => {
				if (result.deletedCount > 0) {
					res.status(204).send();
				} else {
					res.status(404).json({ msg: "Book not found" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ msg: "Error deleting book" });
			});
	} else {
		res.status(500).json({ msg: "Invalid id" });
	}
});

app.patch("/books/:id", (req, res) => {
	const updates = req.body;

	if (ObjectId.isValid(req.params.id)) {
		db.collection("books")
			.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
			.then((result) => {
				if (result.modifiedCount > 0) {
					return db
						.collection("books")
						.findOne({ _id: new ObjectId(req.params.id) });
				} else {
					res.status(404).json({ msg: "Book not found" });
				}
			})
			.then((book) => {
				res.status(200).json(book);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ msg: "Error updating book" });
			});
	}
});
