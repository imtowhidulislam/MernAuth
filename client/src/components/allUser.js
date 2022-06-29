import { useEffect, useState } from "react";

const AllUser = () => {
  const [user, setUser] = useState([]);
  const url = "http://localhost:3001/api/user/";
  const allUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setUser([...data]);
    // return data;
  };
  useEffect(() => {
    allUser();
  }, []);
  return (
    <div style={{ paddingInline: "3rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>All User</h2>
      {user.map((user) => {
        const { _id, username, email, password } = user;

        return (
          <div
            key={_id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              boxShadow: "0px 0px 7px black",
              textTransform: "capitalize",
              backgroundColor: "#f67f45",
              color: "#ffff",
              marginBottom: "1rem",
              borderRadius: ".5rem",
              paddingBlock: "1rem",
            }}
          >
            <p>{username}</p>
            <p>{email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllUser;
