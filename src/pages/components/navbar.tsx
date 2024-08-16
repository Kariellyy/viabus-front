import React from "react";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`navbar w-100 ${styles.navbar}`}>
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Navbar</span>
      </div>
    </nav>
  );
}
