import { PrismaClient } from ".prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

// prisma 에서는 모든게 선택 사항이고
// graphql에선 모든게 옵션 사항이기 때문에
// gql 에서 선택 사항인 타입엔 "!"를 붙여준다.
// prisma 에서 ? 가 붙은 타입은 따로 조치를 취하지 않아도 된다.

const typeDefs = gql`
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

const resolvers = {
	Query: {
		coffees: () => client.coffee.findMany(),
		coffee: () => ({ title: "아메리카노", year: "1998" }),
	},
	Mutation: {
		createCoffee: (_, { title, year, genre }) =>
			client.coffee.create({
				data: {
					title,
					year,
					genre,
				},
			}),
		deleteCoffee: (_, { id }) => client.coffee.delete({ where: { id } }),
		updateCoffee: (_, { id, year }) =>
			client.coffee.update({ where: { id }, data: { year } }),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
