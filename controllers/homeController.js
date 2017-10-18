const promisify = require('es6-promisify');
const mail = require('../handlers/mail.js');


exports.homePage = (req, res) => {
	res.render('index', { title: 'Analytics4Athletes' });
};

exports.playerAnalysisPage = (req, res) => {
	res.render('player-analysis', { title: 'Player Analysis' });
};

exports.playerDevelopmentPage = (req, res) => {
	res.render('player-development', { title: 'Player Development' });
};

exports.teamScoutingReportPage = (req, res) => {
	res.render('team-scouting-report', { title: 'Team Scouting Report' });
};

exports.aboutPage = (req, res) => {
	res.render('about', { title: 'About Us' });
};

exports.forgotPage = (req, res) => {
	res.render('forgot', { title: 'Forgot Password' });
};

exports.blogHomePage = (req, res) => {
	res.render('blog', { title: 'Blog' });
};

exports.contactPage = (req, res) => {
	res.render('contact', { title: 'Contact Us' });
};

exports.validateContactForm = (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'You must supply a name!').notEmpty();
	req.checkBody('email', 'You must supply an email!').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false,
	});
	req.sanitizeBody('phone');
	req.checkBody('phone', 'You must supply a phone number!').notEmpty();;
	req.sanitize('message');
	req.checkBody('message', 'You must supply a message!').notEmpty();;

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('contact', { title: 'Contact Us', name: req.body.name, email: req.body.email, phone: req.body.phone, message: req.body.message, flashes: req.flash() });
		return; // stop the function from running
	}
	next(); // there were no errors!
};

exports.sendContactForm = async (req, res) => {
	const senderName = req.body.name;
	const senderEmail = req.body.email;
	const senderPhone = req.body.phone;
	const senderMessage = req.body.message;

	await mail.sendContactForm({
		from: req.body.email, // Sender address
		replyTo: req.body.email, // Set the reply to email to the sender.
		to: 'Analytics4Athletes <phil@analytics4athletes.com>', // Where to send the form info
		subject: `Message from ${req.body.name}`, // Subject line
		filename: 'contact-form-message',
		senderName,
		senderEmail,
		senderPhone,
		senderMessage
	});
	req.flash('success', 'You\'re message has been sent. We will be with you shortly!');
	res.redirect('/contact');
};
