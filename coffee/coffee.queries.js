import client from "../client";

export default {
	Query: {
		coffees: () => client.coffee.findMany(),
		coffee: () => ({ title: "아메리카노", year: "1998" }),
	},
};
