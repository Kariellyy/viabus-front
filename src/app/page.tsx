"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/common/LoginButton";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/common/SignOutButton";
import { FaMapMarkerAlt, FaBus } from "react-icons/fa";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-sm">
          <Link href="/" className="navbar-brand p-0">
            <Image
              src="/logo-viabus-1.png"
              alt="Logo Viabus"
              width={100}
              height={40}
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex gap-2">
              {session ? (
                session.user.role === "ADMIN" ? (
                  <li className="nav-item">
                    <Link href="/admin">
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
      <main>
        <section
          className={`d-flex justify-content-start align-items-center h-75 py-5 ${styles.backgroundImage}`}
        >
          <div className="container">
            <div className={styles.cardContainer}>
              <h5 className={styles.header}>Compre sua passagem de ônibus</h5>
              <form>
                <div className="mb-3 position-relative">
                  <label htmlFor="origin" className={styles.formLabel}>
                    Origem
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="origin"
                      placeholder="De onde você vai sair?"
                    />
                  </div>
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="destination" className={styles.formLabel}>
                    Destino
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaBus />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      placeholder="Para onde você vai?"
                    />
                  </div>
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="date" className={styles.formLabel}>
                    Data
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      placeholder="Data"
                    />
                  </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Comprar
                </button>
              </form>
            </div>
          </div>
        </section>
        <section className="section2">
          <div className="container">
            <div className="row">
              <div
                className={`d-flex justify-content-center align-items-center text-center p-2 mb-4 ${styles.section2}`}
              >
                <div className="col-8 d-flex justify-content-center">
                  <p className="text-white">
                    A Viabus é uma empresa de transporte rodoviário que atua em
                    diversas cidades do Brasil. Compre sua passagem de ônibus
                    conosco e tenha uma viagem tranquila e segura.
                  </p>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <Image
                    className="d-flex img-fluid"
                    src="/tripTicket.png"
                    alt="Viabus"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
