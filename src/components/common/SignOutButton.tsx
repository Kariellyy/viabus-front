"use client";

import { signOut } from "next-auth/react";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";


const SignOutButton: React.FC = () => {
  return (
    <button className="btn btn-light d-flex gap-2 justify-content-center align-items-center" onClick={() => signOut()}>
      <FaSignOutAlt />
      Sair
    </button>
  );
}

export default SignOutButton;