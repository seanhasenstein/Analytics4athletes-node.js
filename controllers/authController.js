const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail.js');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed Login',
	successRedirect: '/user',
	// successFlash: 'You are now logged in'
});


exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'You are now logged out.');
	res.redirect('/login');
};

exports.loggedIn = (req, res) => {
	res.render('user', { title: 'Analytics 4 Athletes' });
};

exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		next(); // they are logged in
		return;
	}
	req.flash('error', 'You must be logged in for this page.');
	res.redirect('/login');
};

exports.forgot = async (req, res) => {

	// 1. See if a user with that email exists
	const user = await User.findOne({ email: req.body.email });
	if(!user) {
		req.flash('error', 'A password reset has been mailed to you.');
		return res.redirect('/login');
	}
	// 2. Set reset token and expiration  on their account
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
	await user.save();
	// 3. Send them an email with the token
	const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
	await mail.sendForgotMessage({
		user,
		subject: 'Password Reset',
		resetURL,
		filename: 'password-reset'
	});
	req.flash('success', 'You have been emailed a password reset link.');
	// 4. Redirect to login page
	res.redirect('/login');
};

exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		req.flash('error', 'Password reset is invalid or has expired.');
		return res.redirect('/login');
	}
	// if there is a user, show the reset password form
	res.render('reset', { title: 'Reset Your Password' });
};

exports.confirmedPasswords = (req, res, next) => {
	if (req.body.password === req.body['password-confirm']) {
		next(); // keep it going
		return;
	}
	req.flash('error', 'Passwords do not match.');
	res.redirect('back');
};

exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() }
	});
	if (!user) {
		req.flash('error', 'Password reset is invalid or has expired.');
		return res.redirect('/login');
	}
	const setPassword = promisify(user.setPassword, user);
	await setPassword(req.body.password);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updatedUser = await user.save();
	await req.login(updatedUser);
	req.flash('Success', 'Your password has been reset! You are now logged in.');
	res.redirect('/user');
};

exports.scottieLindseyPermission = (req, res, next) => {
	const userID = req.user._id;
	const stringID = userID.toString();
	if (stringID === '59bfdcb9e4968939bbf5e258' || '59fa1e128446ae49dfd23160' || '59fa8cfde3a4854c967fd3de' ) {
		next(); // keep it going!
		return;
	}
	req.flash('error', 'Oops, you don\'t have permission for this.');
	res.redirect('/login');
};
