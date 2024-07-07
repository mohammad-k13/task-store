"use client";

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { GetAllProducts, SearchProducts } from "@/lib/db/actions/query.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type ProductsType = {
	name: string;
	decription: string;
	price: string;
	image: string;
	userId: string;
};

const Products = () => {
	const { toast } = useToast();
	const [searchParams, setSearchParams] = useState<string>();
	const { isPending, isError, isSuccess, data } = useQuery({
		queryKey: ["products"],
		queryFn: async () => await GetAllProducts(),
	});
	const SearchMutation = useMutation({
		mutationFn: async (params: string) => await SearchProducts(params),
	});

	const onSearch = (params: string) => {
		setSearchParams(params);
		
		//** for more performans I perfer to do NOT fetch again but the code is exist  */
		// SearchMutation.mutate(params, {
		// 	onError: (err) => toast({ title: "Error Occure", description: err.message, variant: "destructive" }),
		// });
	};

	return (
		<section className="w-full h-dvh flex flex-col pt-20 gap-4 items-center justify-center">
			<SearchBar onClick={onSearch} />
			{isPending && <p className="text-sm text-neutral-600 dark:text-gray-300">Loading...</p>}
			{!searchParams && (
				<div className="w-full h-full flex flex-wrap gap-4 px-5">
					{!isPending &&
						isSuccess &&
						data.map(({ name, image, price, userId, description }: any, index: number) => (
							<ProductCard
								key={index}
								image={image}
								price={price}
								title={name}
								userId={userId}
								description={description}
							/>
						))}
				</div>
			)}
			{searchParams && (
				<div className="w-full h-full flex flex-wrap gap-4 px-5">
					{data
						.filter((item: any) => item.name === searchParams)
						.map(({ name, image, price, userId, description }: any, index: number) => (
							<ProductCard
								key={index}
								image={image}
								price={price}
								title={name}
								userId={userId}
								description={description}
							/>
						))}
				</div>
			)}
			{isSuccess && data.length === 0 && (
				<p className="text-sm text-neutral-600 dark:text-gray-300 capitalize">
					there is no product to show:))
				</p>
			)}
		</section>
	);
};

export default Products;
