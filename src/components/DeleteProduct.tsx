"use client";

import React, { FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { DeleteProductAction } from "@/lib/db/actions/mutation.action";
import { useToast } from "./ui/use-toast";
import { Separator } from "./ui/separator";

const DeleteProduct = () => {
	const { toast } = useToast();
	const DeleteProduct = useMutation({
		mutationFn: async ({ productId, userId }: { productId: string; userId: string }) =>
			await DeleteProductAction(productId, userId),
	});
	const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
		formEvent.preventDefault();

		const formData = new FormData(formEvent.currentTarget);
		const productId = formData.get("productId") as string;
		const userId = formData.get("userId") as string;

		DeleteProduct.mutate(
			{ productId, userId },
			{
				onError: (error) => toast({ title: error.message, variant: "destructive" }),
				onSuccess: () =>
					toast({ title: "Product Deleted", description: "your product was deleted from db" }),
			},
		);
	};

	return (
		<div className="w-full flex flex-col gap-3 justify-center mt-10">
			<div className="flex flex-col">
				<h2>Delete Products</h2>
				<p className="w-full text-center text-neutral-600 dark:text-gray-300 text-xs">
					Please Be Consider For Delete Your Product!
				</p>
			</div>

			<Separator className="my-5 w-3/4 mx-auto" />


			<form action="#" onSubmit={onSubmit} className="text-xs">
				<Input type="number" placeholder="Enter Product Id" name="productId" required />
				<Input type="number" placeholder="Enter User Id" name="userId" required className="my-2" />

				<Button type="submit" className="w-full my-2 bg-red-500 text-neutral-100 hover:bg-red-400">
					{DeleteProduct.isPending ? "Deleting..." : "Delete Product"}
				</Button>
			</form>
		</div>
	);
};

export default DeleteProduct;
