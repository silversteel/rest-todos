'use strict'
const Todos = require('../models/todos')
const Mailer = require('../modules/mailer')
const Formatter = require('../modules/formatter')
const async = require('async')

module.exports = {
	index: function (req, res) {
		Todos.showAll({}, function(err, result){
			if (err) return res.status(500).json({ error: 'something wrong' })
			return res.status(200).json({ data: result })
		})
	},
	store: function (req, res) {
		const { title } = req.body
		
		Todos.create({ title }, function (err, result) {
			if (err) return res.status(500).json({ error: 'something wrong' })
			return res.status(200).json({ data: result })
		})
	},
	update: function (req, res) {
		const { id } = req.params

		Todos.update({ _id: id }, { $set: req.body }, function(err, result){
			if (err) return res.status(500).json({ error: 'something wrong' })
			return res.status(200).json({ data: result })
		})
	},
	destroy: function (req, res) {
		const { id } = req.params

		Todos.remove({ _id: id }, function(err, result) {
			if (err) return res.status(500).json({ error: 'something wrong' })
			return res.status(200).json({ data: result })
		})
	},
	sendToEmail: async function (req, res) {
		try {
				const { to } = req.body
				const header = '<h2>My Todos</h2>'
				const myTodos = await Todos.asyncShowAll({})
				const body = Formatter.listToHtml(myTodos)

				async.parallel([
		      function (callback) {
		        Mailer.sendEmail(
		          callback,
		          'example@mytodos.com',
		          JSON.parse(to),
		          'My Todos',
		          header+body
		        );
		      }
		    ], function(err, results) {
			    	return res.status(200).json({
			        success: true,
			        message: 'Emails sent'
			      })
		    });
	   } catch(e) {
	   		return res.status(500).json({
	   			error: 'something wrong'
	   		})
	   }
	}
}