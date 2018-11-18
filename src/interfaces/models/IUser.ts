interface IUser {
	updatedAt?: string;
	username?: string;
	email?: string;
	password?: string;
	authToken?: string;
	refreshToken?: string;
	userProfileData?: string;
	userWorkData?: string;
}

export default IUser;

