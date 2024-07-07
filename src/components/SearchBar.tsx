"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { SearchNormal } from "iconsax-react";
import { useMutation } from "@tanstack/react-query";
import { SearchProducts } from "@/lib/db/actions/query.action";

const SearchBar = ({ onClick }: { onClick: (Params: string) => void }) => {
	const [search, setSearch] = useState("");

	return (
		<div className="flex items-center justify-center gap-3">
			<Input
				type="text"
				onChange={(e) => setSearch((e.target.value))}
				placeholder="Search By Title"
				defaultValue={search}
				value={search}
			/>
			<Button size={"icon"} onClick={() => onClick(search)}>
				<SearchNormal />
			</Button>
		</div>
	);
};

export default SearchBar;
