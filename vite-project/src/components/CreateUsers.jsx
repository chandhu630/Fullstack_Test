import { useEffect, useState } from "react";
import axios from "axios";

const CreateUsers = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized! Please log in again.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in again.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/users/create",
        { email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("User created successfully!");

      //  Update the user list after creation
      setUsers((prevUsers) => [...prevUsers, res.data.user]);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "User creation failed!");
    }
  };

  return (
    <div>
      <h2>Created Users</h2>
      
      {/*  Input Fields for Creating Users */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="User Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button onClick={handleCreateUser}>Create User</button>

      {/*  List of Created Users */}
      <ul>{users.map((user) => <li key={user._id}>{user.email}</li>)}</ul>
    </div>
  );
};

export default CreateUsers;
