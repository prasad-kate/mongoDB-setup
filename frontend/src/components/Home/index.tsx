import { FormEvent, useEffect, useState } from "react";
import { getAllUsers, registerUser } from "../../services/user.service";

function Home() {
  interface User {
    name: string;
    _id: string;
    email: string;
  }

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userDataInDb, setUserDataInDb] = useState([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerUser(userData);
  };

  useEffect(() => {
    (async () => {
      try {
        const users = await getAllUsers();
        setUserDataInDb(users);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    })();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      {/* user form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, name: e.target.value }));
          }}
          value={userData.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, email: e.target.value }));
          }}
          value={userData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, password: e.target.value }));
          }}
          value={userData.password}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Submit
        </button>
      </form>

      {/* user details */}
      <p>User Data</p>
      {userDataInDb?.map((user: User) => {
        return <p key={user["_id"]}>{user?.name}</p>;
      })}
    </div>
  );
}

export default Home;
