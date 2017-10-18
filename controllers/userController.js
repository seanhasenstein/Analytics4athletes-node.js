const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail.js');

exports.loginForm = (req, res) => {
	res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
	res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('firstName');
	req.checkBody('firstName', 'You must supply a first name.').notEmpty();
	req.sanitizeBody('lastName');
	req.checkBody('lastName', 'You must supply a last name.').notEmpty();
	req.sanitizeBody('phone');
	req.checkBody('phone', 'You must supply a phone number.').notEmpty();
	req.checkBody('email', 'That email is not valid').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password cannot be blank.').notEmpty();
	req.checkBody('password-confirm', 'Confirmed password cannot be blank.').notEmpty();
	req.checkBody('password-confirm', 'Oops! Your passwords do not match.').equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('register', { title: 'Register', firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone, flashes: req.flash() });
		return; // stop the function from running
	}
	next(); // there were no errors!
};

exports.register = async (req, res, next) => {
	const user = new User({ 
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone
	});
	const register = promisify(User.register, User);
	await register(user, req.body.password);
	next(); // pass to notifyAdmin
};

exports.notifyAdmin = (req, res, next) => {
	const name = req.body.firstName + ' ' + req.body.lastName;
	const email = req.body.email;
	const phone = req.body.phone;
	mail.newUserNotification({
		from: 'noreply@analytics4athletes.com',
		to: 'Sean Hasenstein <seanhasenstein@gmail.com>', // Where to send the notification
		subject: `New Analytics4Athletes Registration ${req.body.firstName} ${req.body.lastName}`, // Subject line
		filename: 'new-registration-notifaction',
		name,
		email,
		phone
	});
	next(); // pass to authController.login
};
