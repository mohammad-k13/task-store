"use client";

import ProductCard from "@/components/ProductCard";
import { GetAllProducts } from "@/lib/db/actions/query.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Products = () => {
	const { isPending, isError, isSuccess, data } = useQuery({
		queryKey: ["products"],
		queryFn: async () => await GetAllProducts(),
	});

	console.log(data);

	return (
		<section className="w-full h-dvh flex flex-wrap gap-4 items-center justify-center">
			{isPending && <p className="text-sm text-neutral-100 dark:text-gray-300">Loading...</p>}
			{!isPending && isSuccess &&
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
				{isSuccess && data.length === 0 && <p className="text-sm text-neutral-100 dark:text-gray-300 capitalize">there is no product to show:))</p>}
		</section>
	);
};

export default Products;
