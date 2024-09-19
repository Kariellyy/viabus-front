export async function createUser(jwt: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao criar ou autenticar o usuário no back-end");
    }

    return response.json();
  } catch (error) {
    console.error("Erro na requisição ao back-end:", error);
  }
}
