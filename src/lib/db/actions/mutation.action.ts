import { ProductInfoType } from "@/components/CreateProduct";
import { sessionType } from "@/components/Header";
import { GetSingleProduct, GetUser } from "./query.action";
import { EditProductMutationProps, selectedProperty } from "@/components/EditProduct";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

//* ---------------- User Mutation
export const CreateUserAction = async (newUser: sessionType["user"]): Promise<any> => {
	const user = await GetUser(newUser);
	if (user !== null) return user as sessionType["user"];

	try {
		const res = await fetch(`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/users`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
		return await res.json();
	} catch (err: any) {
		console.log(err.message);
	}
};

//* ---------------- Product Mutation
export const CreateProductAction = async (productInfo: ProductInfoType, userId: string) => {
	const productIsExist = await IsProductExists(productInfo.name);
	if (productIsExist) return;

	try {
		const res = await fetch(`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/users/${userId}/products`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(productInfo),
		});
		return await res.json();
	} catch (err: any) {
		console.log(err);
	}
};

export const IsProductExists = async (productName: string) => {
	try {
		const res = await fetch(`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/products`);
		const products = await res.json();

		const productIndex = products.findIndex((prod: ProductInfoType) => prod.name === productName);
		return productIndex === -1 ? false : true;
	} catch (err) {
		console.log(err);
	}
};

export const CreateUserAndProductAction = async ({
	userInfo,
	productInfo,
}: {
	userInfo: sessionType["user"];
	productInfo: ProductInfoType;
}) => {
	try {
		//create user
		const user = await CreateUserAction(userInfo);

		//create Product
		const product = await CreateProductAction(productInfo, user.id);

		return product;
	} catch (err) {
		console.log(err);
	}
};

export const DeleteProductAction = async (productId: string, userId: string) => {
	try {
		const res = await fetch(
			`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/users/${userId}/products/${productId}`,
			{
				method: "DELETE",
			},
		);
		return await res.json();
	} catch (err) {
		console.log(err);
	}
};

export const EditProductAction = async (payload: EditProductMutationProps) => {
	if (payload.selectPropety === "nothing") {
		revalidatePath("/profile");
		return;
	}

	try {
		const product = await GetSingleProduct({ prodId: payload.productId, userId: payload.userId });
		const newProduct = {
			...product,
			[payload.selectPropety]: payload[payload.selectPropety],
		};
		const res = await fetch(
			`https://66859e1db3f57b06dd4d55f1.mockapi.io/store-info/users/${payload.userId}/products/${payload.productId}`,
			{
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(newProduct),
			},
		);
	} catch (err) {
		console.log(err);
	}
};
