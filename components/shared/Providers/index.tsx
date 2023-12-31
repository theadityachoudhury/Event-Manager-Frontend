"use client";

import { ReactNode } from "react";
interface Props {
	children: ReactNode;
}

const Providers = ({ children }: Props) => {
	return {children};
};

export default Providers;
