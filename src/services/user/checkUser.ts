export async function checkUser(jwt: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    // Pytort

    if (!response.ok) {
      console.error(
        "Erro ao verificar usuário no back-end:",
        response.statusText
      );
    }

    return response.json();
  } catch (error) {
    console.error("Erro na requisição ao back-end:", error);
  }
}
