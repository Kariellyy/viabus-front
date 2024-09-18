"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";


const LoginButton: React.FC = () => {
  const searchParams = useSearchParams();

  // Obtém o callbackUrl da URL atual, se presente
  const callbackUrl = searchParams.get("callbackUrl") || "/"; 

  return (
      <button
        className="btn btn-light d-flex gap-2 justify-content-center align-items-center"
        onClick={() => signIn("google", { callbackUrl })}
      >
        <FaGoogle />
        Login
      </button>
  );
}

export default LoginButton;