import client from "../client";
export default {
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
