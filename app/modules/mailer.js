let helper = require('sendgrid').mail
const async = require('async')
const config = require('../config')

module.exports = {
	sendEmail: function(parentCallback, fromEmail, toEmails, subject, htmlContent) {
		const errorEmails = [];
    const successfulEmails = [];
		const sg = require('sendgrid')(config.sendgrid_apikey);
		async.parallel([
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, function (error, response) {
            if (error) {
              throw new Error('Error response received')
              console.log('Error response received');
            }
          });
        }
        // return
        callback(null, true);
      }
    ], function(err, results) {
      console.log('Done');
    });
    parentCallback(null);
	}
}