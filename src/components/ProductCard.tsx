import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type ProductCardProps = {
	title: string;
	image: string;
	userId: string;
	price: string;
	description: string;
};
const ProductCard = ({ image, price, title, userId, description }: ProductCardProps) => {
	return (
		<Card className="w-[350px] h-[420px]">
			<CardHeader>
				<Image
					src={image}
					width={640}
					height={480}
					alt="product-image"
					className="w-full h-1/2 rounded-md overflow-hidden"
				/>
			</CardHeader>
			<CardContent>
				<CardTitle className="w-full">{title}</CardTitle>
				<p className="text-xs text-neutral-600 dark:text-gray-400 w-full text-justify mt-2 truncate">
					{description}
				</p>
			</CardContent>
			<CardFooter className="flex flex-col p-0 w-4/5 mx-auto ">
				<div className="w-full flex justify-between">
					{" "}
					<p className="text-xs text-neutral-600 dark:text-gray-400 w-full text-center my-2">
						${price}
					</p>
					<p className="text-xs text-neutral-600 dark:text-gray-400 w-full text-center my-2">
						userId: {userId}
					</p>
					<p className="text-xs text-neutral-600 dark:text-gray-400 w-full text-center my-2">
						productId: {userId}
					</p>
				</div>
				<Button className="w-full" size={'sm'}>See More!</Button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
