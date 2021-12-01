import { gql } from "apollo-server-core";

export default gql`
	type User {
		id: String!
		username: String!
		email: String!
		name: String!
		location: String
		avatarURL: String
		githubUsername: String
		createdAt: String!
		updatedAt: String!
	}

	type Mutation {
		createAccount(
			username: String!
			email: String!
			name: String!
			location: String
			avatarURL: String
			githubUsername: String
			password: String!
		): Boolean
	}

	type Query {
		seeProfile(username: String!): User
	}
`;
