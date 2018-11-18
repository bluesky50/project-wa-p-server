import mongoose from 'mongoose';
import IUser from '../interfaces/models/IUser';

export interface IUserDocument extends mongoose.Document, IUser {}

export interface IUserModel extends mongoose.Model<IUserDocument> {}

const UserSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
	type: mongoose.Schema.Types.ObjectId,
	required: false,
	default: null,
	ref: '',
},
title: {
	type: String,
	required: false,
	default: '',
	maxLength: 24,
	minLength: 1
},
description: {
	type: String,
	required: false,
	default: '',
	maxLength: 24,
	minLength: 1
},
type: {
	type: String,
	required: false,
	default: '',
	maxLength: 24,
	minLength: 1
},
category: {
	type: String,
	required: false,
	default: '',
	maxLength: 24,
	minLength: 1
},
tags: {
	type: [{
		type: String,
		ref: ''
	}],
	required: false,
	default: [],
}
}, { versionKey: false });

const User: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema, 'Users');

export default User;

