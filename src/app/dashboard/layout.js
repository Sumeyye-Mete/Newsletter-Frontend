"use client";

import { useAuth } from "@/hooks/auth";
import "../globals.css";
import Loading from "@/components/Loading";

const DashboardLayout = ({ children }) => {
	const { user } = useAuth({ middleware: "auth" });

	if (!user) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default DashboardLayout;
