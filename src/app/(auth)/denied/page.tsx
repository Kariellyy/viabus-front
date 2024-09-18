import Link from "next/link";

export default function DeniedPage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6 text-center">
          <h1 className="display-5">Acesso negado</h1>
          <p className="lead">
            Você não tem permissão para acessar esta página.
          </p>
          <Link href={"/"} className="btn btn-outline-primary">Voltar</Link>
        </div>
      </div>
    </div>
  );
}