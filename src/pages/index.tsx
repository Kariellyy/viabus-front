// pages/index.js
import Head from "next/head";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/menu";
import RegisterRoute from "./components/formRegisterRoute";
import RegisterDriver from "./components/registerDriver";
import ViewRoutes from "./components/viewRoutes";
import Navbar from "./components/navbar";
import styles from "@/styles/main.module.css";
import CardInfo from "./components/cardInfo";
import { FaHome, FaRoute, FaUserPlus } from "react-icons/fa";


export default function Home() {
  const [activePage, setActivePage] = useState("home");
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <Navbar />
        <div
          className="flex-grow-1"
          style={{ marginLeft: "280px", marginTop: "60px" }}
        >
          <Menu setActivePage={setActivePage} />
          <main className={`main ${styles.main}`}>
            <div className="row">
              {activePage === "home" && (
                <>
                  <CardInfo
                    icon={FaHome}
                    title="Receita"
                    value="R$ 100,00"
                    color="#7BB8FC"
                  />
                  <CardInfo
                    icon={FaRoute}
                    title="Ticket"
                    value="200"
                    color="#247BA0"
                  />
                  <CardInfo
                    icon={FaUserPlus}
                    title="Veículos em uso"
                    value="15"
                    color="#295878"
                  />
                </>
              )}
            </div>
            <RegisterRoute activePage={activePage}/>
            <RegisterDriver activePage={activePage}/>
            <ViewRoutes activePage={activePage}/>
          </main>
        </div>
      </div>
    </>
  );
}
