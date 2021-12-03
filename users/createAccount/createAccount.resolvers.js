import client from "../../client";
import bcrypt from "bcrypt";

export default {
	Mutation: {
		createAccount: async (
			_,
			{
				name,
				email,
				username,
				location,
				avatarURL,
				githubUsername,
				password,
			}
		) => {
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [
							{
								name,
							},
							{
								email,
							},
						],
					},
				});
				if (existingUser) {
					console.log("이미 존재하는 username 또는 email 입니다.");
					throw new Error("This username/password is already taken.");
				}
				console.log(existingUser);
				const uglyPassword = await bcrypt.hash(password, 10);
				const user = await client.user.create({
					data: {
						username,
						email,
						name,
						location,
						avatarURL,
						githubUsername,
						password: uglyPassword,
					},
				});
				if (user == null) {
					console.log("user가 DB에 생성되지 않았습니다.");
					return false;
				}
				console.log(
					`user : ${user.username}\n email : ${user.email} 가 정상적으로 생성되었습니다.`
				);
				return true;
			} catch (error) {
				return error;
			}
		},
	},
};
