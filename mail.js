const mailjet = require ('node-mailjet')
	.connect('4300c2aa3b815adf4dadb12f92cd7ea4', '92e41e1e5e2626fc12950a8f9e326af1');

const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages": [
			{
				"From": {
					"Email": "newsletter@webapp.tips",
					"Name": "Feranmi"
				},
				"To": [
					{
						"Email": "newsletter@webapp.tips",
						"Name": "Feranmi"
					}
				],
				"Subject": "Greetings from Mailjet.",
				"TextPart": "My first Mailjet email",
				"HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
				"CustomID": "AppGettingStartedTest"
			}
		]
	});

request.then((result) => {
	console.log(result.body);
}).catch((err) => {
	console.log(err.statusCode);
});
