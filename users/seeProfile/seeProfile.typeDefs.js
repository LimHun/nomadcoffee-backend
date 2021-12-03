import { gql } from "apollo-server";

export default gql`
	type Query {
		seeProfile(email: String!): User
	}
`;
