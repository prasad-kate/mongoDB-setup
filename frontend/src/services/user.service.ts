export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Fetch error: ${error.message}`);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:8000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // Return data if you need to use it elsewhere
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Fetch error: ${error.message}`);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};
