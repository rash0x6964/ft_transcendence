import React from "react"
import AuthButton from "@/components/BaseComponents/AuthButton"
import Input from "@/components/BaseComponents/Input"
import { redirect } from "next/navigation";

export default function page() {
	redirect("/lobby");
}
