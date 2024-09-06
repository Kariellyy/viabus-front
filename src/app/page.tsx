import React from "react";
import { redirect } from "next/navigation";

export default function Home() {
  // mandar para a rota /login
  redirect("/admin");

  // Isso é provisório. Aqui terá a landing page inicial do site que irá 
  // capturar o usuário e redirecionar para a página de login

  return <></>;
}
