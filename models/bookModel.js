/*
 * @Author: Mia
 * @Date: 2021-10-29 15:43:02
 * @Description: 
 */
const mongoose = require('mongoose');

// Book Schema 库表字段
const bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: Array,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	genreName: {
		type: Array,
	},
	description:{
		type: String
	},
	image_url:{
		type: String
	},
	view_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Get Book by Title
module.exports.getBookByTitle = (title, callback) => {
	Book.findOne(title, callback)
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	console.log('updateBook',book)
	var update = {
		title: book.title,
		genre: book.genre,
		genreName: book.genreName,
		description: book.description,
		author: book.author,
		image_url: book.image_url,
		view_url: book.view_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}