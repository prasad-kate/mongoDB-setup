import { FormEvent, useEffect, useState } from "react";
import {
  getAllUsers,
  registerUser,
  updateUser,
} from "../../services/user.service";

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

  const [updateUserData, setUpdateUserData] = useState({
    updateName: "",
    updateEmail: "",
    updatePassword: "",
    updateUserId: "",
  });

  const [userDataInDb, setUserDataInDb] = useState([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerUser(userData);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    const { updateUserId, updateName, updateEmail, updatePassword } =
      updateUserData;

    if (!updateUserId) {
      alert("User ID is required");
    }

    if (updateUserId) {
      updateUser(updateUserData.updateUserId, {
        name: updateName,
        email: updateEmail,
        password: updatePassword,
      });
    }
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
    <div className="main-container">
      {/* user form */}
      <p className="title">Create User</p>
      <form onSubmit={handleSubmit} className="form">
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
        <button type="submit" className="button">
          Submit
        </button>
      </form>

      <hr className="separator-x" />

      {/* user details */}
      <p className="title">User Data</p>
      {userDataInDb?.map((user: User) => {
        return <p key={user["_id"]}>{`${user?.name} - ${user._id}`}</p>;
      })}

      <hr className="separator-x" />

      <p className="title">Update user</p>
      <form onSubmit={handleUpdate} className="form">
        <input
          type="text"
          name="updateUserId"
          placeholder="Enter ID"
          onChange={(e) => {
            setUpdateUserData((prev) => ({
              ...prev,
              updateUserId: e.target.value,
            }));
          }}
          value={updateUserData.updateUserId}
        />
        <input
          type="text"
          name="updateName"
          placeholder="Enter Name"
          onChange={(e) => {
            setUpdateUserData((prev) => ({
              ...prev,
              updateName: e.target.value,
            }));
          }}
          value={updateUserData.updateName}
        />
        <input
          type="email"
          name="updateEmail"
          placeholder="Enter Email"
          onChange={(e) => {
            setUpdateUserData((prev) => ({
              ...prev,
              updateEmail: e.target.value,
            }));
          }}
          value={updateUserData.updateEmail}
        />
        <input
          type="password"
          name="updatePassword"
          placeholder="Enter Password"
          onChange={(e) => {
            setUpdateUserData((prev) => ({
              ...prev,
              updatePassword: e.target.value,
            }));
          }}
          value={updateUserData.updatePassword}
        />
        <button type="submit" className="button">
          Update
        </button>
      </form>

      <hr className="separator-x" />
    </div>
  );
}

export default Home;
