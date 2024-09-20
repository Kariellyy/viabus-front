"use client";

import React from "react";
import Link from "next/link";
import LoginButton from "@/components/common/LoginButton";
import { signOut, useSession } from "next-auth/react";
import SignOutButton from "@/components/common/SignOutButton";

export default function Home() {
  // pegar a session
  const { data: session } = useSession();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            Navbar
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex gap-2">
              {session ? (
                session.user.role === "ADMIN" ? (
                  <li className="nav-item">
                  <Link href={"/admin"}>
                    <button className="btn btn-secondary">Admin</button>
                  </Link>
                </li>
                ) : null
              ) : null}
              <li className="nav-item">
                {session ? <SignOutButton /> : <LoginButton />}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <h1>Home</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          quidem, dolorum, voluptatem, quod quas quibusdam quae quia nesciunt
          fugiat autem repellendus. Quisquam, quidem. Quisquam, quidem.
        </p>
      </main>
    </>
  );
}
