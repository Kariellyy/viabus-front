// criar um layout para o login. Ele deve ser centralizado horizontal e verticalmente
// deve usar bootstrap e ser responsivo

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="card p-4">{children}</div>
    </div>
  );
};

export default LoginLayout;
