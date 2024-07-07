"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { sessionType } from "./Header";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { CreateUserAndProductAction } from "@/lib/db/actions/mutation.action";
import { Image } from "iconsax-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Separator } from "./ui/separator";

type CreateProductProps = {
	session: sessionType;
};

export type ProductInfoType = {
	name: string;
	price: string;
	description: string;
};

const CreateProduct = ({ session }: CreateProductProps) => {
	const { toast } = useToast();

	//tanstack mutation
	const ProductMutation = useMutation({
		mutationFn: async ({
			productInfo,
			userInfo,
		}: {
			productInfo: ProductInfoType;
			userInfo: sessionType["user"];
		}) => await CreateUserAndProductAction({ productInfo, userInfo }),
	});

	const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
		formEvent.preventDefault();

		//get product info and send to mockapi
		const formData = new FormData(formEvent.currentTarget);
		const productInfo = {
			name: formData.get("name") as string,
			price: formData.get("price") as string,
			description: formData.get("description") as string,
		};

		ProductMutation.mutate(
			{ productInfo, userInfo: session.user },
			{
				onError: (error) => toast({ title: error.message, variant: "destructive" }),
				onSuccess: () =>
					toast({ title: "Product Created", description: "your product was created in db" }),
			},
		);
	};

	return (
		<div className="w-full flex flex-col gap-3 justify-center mt-10">
			<div className="flex flex-col">
				<h2>Create Products</h2>
				<p className="w-full text-center text-neutral-600 dark:text-gray-300 text-xs capitalize">
					Please provide info to create your product.
				</p>
			</div>

			<Separator className="my-5 w-3/4 mx-auto" />

			<form action="#" onSubmit={onSubmit} className="text-xs">
				<Input type="text" placeholder="Enter Product Name" name="name" required />
				<Input type="number" placeholder="$ Price" name="price" required className="my-3" />
				<Textarea placeholder="description" name="description" required className="my-3" />

				<Button type="submit" className="w-full my-2">
					{ProductMutation.isPending ? "Creatting.." : "Create Product"}
				</Button>
			</form>
		</div>
	);
};

export default CreateProduct;
