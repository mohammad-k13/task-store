import { sessionType } from "@/components/Header";

//* ---------------- Product Query
export const GetAllProducts = async () => {
	try {
		const res = await fetch(`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/products`);
		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

export const GetSingleProduct = async ({ prodId, userId }: { prodId: string; userId: string }) => {
	try {
		const res = await fetch(`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/users/${userId}/products/${prodId}`);
		return res.json();
	} catch (err) {
		return err
	}
};

//* ---------------- User Query
export const GetUser = async (userInfo: sessionType["user"]) => {
	try {
		const res = await fetch(`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/users`);
		const userList = await res.json();

		const user = userList.find(
			(user: sessionType["user"]) => user.email === userInfo.email && user.name === userInfo.name,
		);

		return user ? user : null;
	} catch (err) {
		console.dir(err);
	}
};
