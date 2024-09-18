export async function fetchUsers(jwt: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao buscar usuários no back-end");
    }

    return response.json();
  } catch (error) {
    console.error("Erro na requisição ao back-end:", error);
  }
}
