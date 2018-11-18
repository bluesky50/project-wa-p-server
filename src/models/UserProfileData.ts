import mongoose from 'mongoose';
import IUserProfileData from '../interfaces/models/IUserProfileData';

export interface IUserProfileDataDocument extends mongoose.Document, IUserProfileData {}

export interface IUserProfileDataModel extends mongoose.Model<IUserProfileDataDocument> {}

const UserProfileDataSchema: mongoose.Schema = new mongoose.Schema({
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

const UserProfileData: IUserProfileDataModel = mongoose.model<IUserProfileDataDocument, IUserProfileDataModel>('UserProfileData', UserProfileDataSchema, 'UserProfileDatas');

export default UserProfileData;

