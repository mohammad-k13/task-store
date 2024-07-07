"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { EditProductAction } from "@/lib/db/actions/mutation.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "./ui/use-toast";

export type selectedProperty = "name" | "price" | "description";
export type EditProductMutationProps = {
	productId: string;
	userId: string;
	selectPropety: selectedProperty | "nothing";
	[key: string]: string;
};
const EditProduct = () => {
	const [select, setSelect] = useState<selectedProperty | null>(null);
	const { toast } = useToast();

	const EditProductMutation = useMutation({
		mutationFn: async (info: EditProductMutationProps) => await EditProductAction(info),
	});
	const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
		formEvent.preventDefault();
		const formData = new FormData(formEvent.currentTarget);

		const info: EditProductMutationProps = {
			productId: formData.get("productId") as string,
			userId: formData.get("userId") as string,
			selectPropety: select !== null ? select : "nothing",
			[select as selectedProperty]: formData.get("newValue") as string,
		};

		EditProductMutation.mutate(info, {
			onError: (error) => toast({ title: error.message, variant: "destructive" }),
			onSuccess: () => toast({ title: "Changes Submit!", description: "your changes was submitted!" }),
		});
	};

	return (
		<div className="w-full flex flex-col gap-3 justify-center mt-10">
			<div className="flex flex-col gap-1">
				<h2>Edit Products</h2>
				<p className="w-full text-center text-neutral-600 dark:text-gray-300 text-xs">
					Please specify the field you would like to change.
				</p>
			</div>

			<Separator className="my-5 w-3/4 mx-auto" />


			<form onSubmit={onSubmit} className="text-xs">
				<Input type="number" placeholder="Enter Product Id" name="productId" required />
				<Input type="number" placeholder="Enter User Id" name="userId" required className="my-2" />

				<Separator className="my-5" />

				<div className="w-full rounded-md p-1 flex items-center justify-between gap-2">
					<Select onValueChange={(value: selectedProperty) => setSelect(value)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="name">Name</SelectItem>
							<SelectItem value="price">Price</SelectItem>
							<SelectItem value="description">Description</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type={select === "price" ? "number" : "text"}
						className="w-full py-2 h-10"
						placeholder="Enter New Value"
						name="newValue"
					/>
				</div>

				<Button type="submit" className="w-full my-2">
					{EditProductMutation.isPending ? "Changing..." : "Change Product"}
				</Button>
			</form>
		</div>
	);
};

export default EditProduct;
