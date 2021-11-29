import { gql } from "apollo-server";

// prisma 에서는 모든게 선택 사항이고
// graphql에선 모든게 옵션 사항이기 때문에
// gql 에서 선택 사항인 타입엔 "!"를 붙여준다.
// prisma 에서 ? 가 붙은 타입은 따로 조치를 취하지 않아도 된다.
export default gql`
	type Coffee {
		id: Int!
		title: String!
		year: Int!
		genre: String
		createAt: String!
		updateAt: String!
	}
	type Query {
		coffees: [Coffee]
		coffee: Coffee
	}
	type Mutation {
		createCoffee(title: String!, year: Int!, genre: String): Coffee
		deleteCoffee(id: String!): Boolean
		updateCoffee(id: Int!, year: Int!): Coffee
	}
`;
