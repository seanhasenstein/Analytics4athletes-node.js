const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address'],
		require: 'Please Supply an Email Address'
	},
	username: {
		type: String,
		unique: true,
		trim: true,
		required: 'Please Supply a Username',
	},
	firstName: {
		type: String,
		required: 'Please Supply a First Name',
		trim: true,
	},
	lastName: {
		type: String,
		required: 'Please Supply a Last Name',
		trim: true,
	},
	phone: {
		type: String,
		required: 'Please Supply a Phone Number',
		trim: true,
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);