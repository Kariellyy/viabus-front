import React from "react";
import styles from "@/styles/viewDriver.module.css";

const exampleDrivers = [
  {
    nome: "João da Silva",
    dataNascimento: "01/01/1990",
    genero: "Masculino",
    telefone: "(11) 99999-9999",
    chavePix: "88888888888",
    informacoesBancarias: "Banco: 001, Agência: 0001, Conta: 0000001",
    cnh: "123456789",
  },
  {
    nome: "Maria Oliveira",
    dataNascimento: "01/01/1995",
    genero: "Feminino",
    telefone: "(11) 99999-9999",
    chavePix: "77777777777",
    informacoesBancarias: "Banco: 002, Agência: 0002, Conta: 0000002",
    cnh: "987654321",
  },
  {
    nome: "José Pereira",
    dataNascimento: "01/01/1985",
    genero: "Masculino",
    telefone: "(11) 99999-9999",
    chavePix: "66666666666",
    informacoesBancarias: "Banco: 003, Agência: 0003, Conta: 0000003",
    cnh: "123123123",
  },

];

export default function ViewDriver({ drivers }: { drivers: any[] }) {
  return (
    <div className={styles.driverTableContainer}>
      <h2>Motoristas Cadastrados</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Gênero</th>
            <th>Telefone</th>
            <th>Chave PIX</th>
            <th>Informações Bancárias</th>
            <th>CNH</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum motorista cadastrado.</td>
            </tr>
          ) : (
            drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.nome}</td>
                <td>{driver.dataNascimento}</td>
                <td>{driver.genero}</td>
                <td>{driver.telefone}</td>
                <td>{driver.chavePix}</td>
                <td>{driver.informacoesBancarias}</td>
                <td>{driver.cnh}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
