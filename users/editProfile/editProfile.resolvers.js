import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
	Mutation: {
		editProfile: protectedResolver(
			async (
				_,
				{
					name,
					email,
					username,
					avatarURL,
					location,
					githubUsername,
					password: newPassword,
				},
				{ loggedInUser }
			) => {
				console.log(loggedInUser);
				let uglyPassword = null;
				if (newPassword) {
					uglyPassword = await bcrypt.hash(newPassword, 10);
				}
				const updatedUser = await client.user.update({
					where: {
						id: loggedInUser.id,
					},
					data: {
						name,
						email,
						username,
						avatarURL,
						location,
						githubUsername,
						...(uglyPassword && { password: uglyPassword }),
					},
				});
				if (updatedUser.id) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "Could not update profile.",
					};
				}
			}
		),
	},
};

// export default {
// 	Mutation: {
// 		editProfile: async (
// 			_,
// 			{
// 				name,
// 				email,
// 				username,
// 				avatarURL,
// 				location,
// 				githubUsername,
// 				password: newPassword,
// 			},
// 			{ loggedInUser }
// 		) => {
// 			console.log(loggedInUser);
// 			let uglyPassword = null;
// 			if (newPassword) {
// 				uglyPassword = await bcrypt.hash(newPassword, 10);
// 			}
// 			const updatedUser = await client.user.update({
// 				where: {
// 					id: loggedInUser.id,
// 				},
// 				data: {
// 					name,
// 					email,
// 					username,
// 					avatarURL,
// 					location,
// 					githubUsername,
// 					...(uglyPassword && { password: uglyPassword }),
// 				},
// 			});
// 			if (updatedUser.id) {
// 				return {
// 					ok: true,
// 				};
// 			} else {
// 				return {
// 					ok: false,
// 					error: "Could not update profile.",
// 				};
// 			}
// 		},
// 	},
// };
