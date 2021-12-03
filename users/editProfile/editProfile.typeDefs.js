import { gql } from "apollo-server";

export default gql`
	type EditProfileResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		editProfile(
			name: String
			email: String
			username: String
			password: String
			location: String
			avatarURL: String
			githubUsername: String
		): EditProfileResult!
	}
`;
