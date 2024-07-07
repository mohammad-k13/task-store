import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateProduct from "@/components/CreateProduct";
import { auth } from "../../../auth";
import { sessionType } from "@/components/Header";
import { redirect } from "next/navigation";
import DeleteProduct from "@/components/DeleteProduct";
import EditProduct from "@/components/EditProduct";

const Profile = async () => {
	const session = (await auth()) as sessionType;
	if (!session) redirect("/auth");

	return (
		<section className="w-full h-dvh flex items-center justify-center p-3">
			<Tabs defaultValue="Create" className="w-full max-w-[400px] text-center border p-5 rounded-md">
				<TabsList className="w-full">
					<TabsTrigger value="Create" className="flex-grow">
						Create
					</TabsTrigger>
					<TabsTrigger value="Delete" className="flex-grow">
						Delete
					</TabsTrigger>
					<TabsTrigger value="Edit" className="flex-grow">
						Edit
					</TabsTrigger>
				</TabsList>
				<TabsContent value="Create">
					<CreateProduct session={session} />
				</TabsContent>
				<TabsContent value="Delete">
					<DeleteProduct />
				</TabsContent>
				<TabsContent value="Edit">
					<EditProduct />
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default Profile;
