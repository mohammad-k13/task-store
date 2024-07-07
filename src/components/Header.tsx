import Link from "next/link";
import React, { ReactNode } from "react";
import { ModeToggle } from "./ModeToggle";
import {
	AvatarIcon,
	CardStackIcon,
	ComponentPlaceholderIcon,
	GitHubLogoIcon,
	HamburgerMenuIcon,
	HomeIcon,
	LockOpen1Icon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { auth, signOut } from "../../auth";
import Image from "next/image";
import { Book } from "iconsax-react";

export type sessionType = {
	user: {
		name: string;
		email: string;
		image: string;
	};
	expires: string;
};

const links: { label: string; path: string; icon: ReactNode }[] = [
	{ label: "home", path: "/", icon: <HomeIcon /> },
	{ label: "products", path: "/products", icon: <ComponentPlaceholderIcon /> },
	{ label: "login", path: "/auth", icon: <LockOpen1Icon /> },
	{ label: "about us", path: "/about-us", icon: <Book size="15" /> },
	{ label: "profile", path: "/profile", icon: <AvatarIcon /> },
];

const Header = async () => {
	const session = (await auth()) as sessionType;

	const navLinks = () => {
		if (session) {
			return links.map(
				(link) =>
					link.label !== "login" && (
						<li
							key={link.label}
							className="w-fit capitalize text-sm text-gray-500 dark:hover:text-gray-100 hover:text-black p-2  transition-colors cursor-pointer">
							<Link
								href={link.path}
								className="w-fit flex items-center flex-row-reverse gap-1">
								{link.label}
								{link.icon}
							</Link>
						</li>
					),
			);
		} else {
			return links.map(
				(link) =>
					link.label !== "cart" &&
					link.label !== "profile" && (
						<li
							key={link.label}
							className="w-fit capitalize text-sm text-gray-500 dark:hover:text-gray-100 hover:text-black p-2  transition-colors cursor-pointer">
							<Link
								href={link.path}
								className="w-fit flex items-center flex-row-reverse gap-1">
								{link.label}
								{link.icon}
							</Link>
						</li>
					),
			);
		}
	};
	return (
		<header className="w-[95%] h-14 border fixed top-3 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-between px-5 backdrop-blur-sm z-50">
			<ul className="w-fit flex items-center gap-5 max-md:hidden">
				{navLinks()}
				{session && (
					<form
						action={async () => {
							"use server";
							await signOut();
						}}>
						<Button
							type="submit"
							variant={"ghost"}
							className="text-red-500 dark:hover:bg-red-500 dark:hover:text-red-100 transition-all">
							Sign Out
						</Button>
					</form>
				)}
			</ul>
			{/* this is for mobile */}
			<Sheet>
				<SheetTrigger>
					<Button variant={"outline"} size={"icon"} className="md:hidden dark:text-neutral-600">
						<HamburgerMenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent side={"left"} className="w-[65%]">
					<SheetHeader>
						<SheetTitle>Do Want Know Us?</SheetTitle>
						<Button className="my-2 ">About Us</Button>
					</SheetHeader>
					<Separator className="my-10" />
					<ul className="flex flex-col items-start gap-2">{navLinks()}</ul>
					<footer className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%]">
						<Separator className="my-5" />

						{session ? (
							<div className="w-full text-sm text-gray-600 dark:text-gray-400  rounded-md  transition-colors cursor-pointer flex items-center  justify-between gap-1">
								<div className="w-full flex items-center justify-between ">
									<div className="flex flex-col">
										<p>{session.user.name}</p>
										<small className="text-xs text-gray-300">
											{session.user.email}
										</small>
									</div>
									<form
										action={async () => {
											"use server";
											await signOut();
										}}>
										<Button
											size={"sm"}
											type="submit"
											variant={"ghost"}
											className="text-red-500 dark:hover:bg-red-500 dark:hover:text-red-100 transition-all">
											Sign Out
										</Button>
									</form>
								</div>
							</div>
						) : (
							<p className="w-full text-sm text-gray-600 dark:text-gray-400 dark:hover:text-neutral-50 hover:bg-blue-500 p-2 rounded-md  transition-colors cursor-pointer flex items-center flex-row-reverse justify-end gap-1">
								Profile
								<AvatarIcon />
							</p>
						)}
					</footer>
				</SheetContent>
			</Sheet>
			<div className="flex items-center gap-2">
				<ModeToggle />
				<Button size={"icon"} variant={"outline"}>
					<a href="https://github.com/mohammad-k13/task-store" target="_blank">
						<GitHubLogoIcon className=" dark:text-neutral-600" />
					</a>
				</Button>
				{session && (
					<Button size={"icon"} variant={"outline"} className="overflow-hidden ">
						<Image
							src={session.user.image}
							alt="user-profile"
							width={35}
							height={35}
							className="w-full h-full "
						/>
					</Button>
				)}
			</div>
		</header>
	);
};

export default Header;
