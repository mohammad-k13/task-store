import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { signIn } from "../../../auth";
const Login = () => {
	return (
		<section className="w-full h-dvh flex items-center justify-center">
			<form
				action={async () => {
					"use server"
					await signIn("github", {redirectTo: "/profile"});
				}}
				className="border rounded-md p-4 flex flex-col gap-3 items-center justify-center">
				<h2 className="text-sm">Create Account To Continue!</h2>
				<Button type="submit" size={"sm"} className="w-full flex items-center gap-3">
					<GitHubLogoIcon /> Github
				</Button>
			</form>
		</section>
	);
};

export default Login;
