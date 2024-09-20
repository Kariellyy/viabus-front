// services/stopService.ts
export const addStop = async (jwt: string, stopData: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stops`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(stopData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Ocorreu um erro." };
    }
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
    return { success: false, error: "Erro ao conectar ao servidor." };
  }
};


export const fetchStops = async (jwt: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stops`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
    return { success: false, error: "Erro ao conectar ao servidor." };
  }
};