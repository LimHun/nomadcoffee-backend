import { gql } from "apollo-server";

export default gql`
	type CreateAccountResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		createAccount(
			name: String!
			email: String!
			username: String!
			password: String!
			location: String
			avatarURL: String
			githubUsername: String
		): CreateAccountResult!
	}
`;
