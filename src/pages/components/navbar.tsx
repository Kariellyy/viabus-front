import React from "react";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`navbar  ${styles.navbar}`}>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <span className="navbar-brand mb-0 h1">Home</span>
      </div>
    </nav>
  );
}
