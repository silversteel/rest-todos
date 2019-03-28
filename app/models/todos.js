'use strict'

const mongoose = require('mongoose')

let todosSchema = mongoose.Schema(
	{
		'title': {
			type: String,
			required: true
		},
		'is_completed': {
			type: Boolean,
			default: false
		},
		'created_at': {
			type: Date,
			default: Date.now
		}
	},
	{
		collection: 'todos'
	}
)

todosSchema.statics.showAll = function (param, cb) {
	return this.find(param, cb)
}

todosSchema.statics.asyncShowAll = function (param) {
	return new Promise((resolve, reject) => {
		this.find(param, function(err, result){
			if(err){
				throw new Error(err)
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

module.exports = mongoose.model('Todos', todosSchema)