import axios from "axios";
import { useEffect, useState } from "react";
import ScheduleTweet from "./ScheduleTweet";

import GenerateTweet from "./GenerateTweet";

function Login({ authUser, setAuthUser, manualActive }) {
  // const [manualActive, setManualActive] = useState(true);

  const isAuthenticated = !!authUser;

  function handleLogin() {
    //post to auth endpoint
    window.open("https://twitter-auth.audaxious.com/auth/twitter", "_self");
  }

  function handleLogout() {
    //post to auth endpoint
    window.open("https://twitter-auth.audaxious.com/auth/logout", "_self");
    setAuthUser(null);
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://twitter-auth.audaxious.com/auth/login/success",
          {
            withCredentials: true,
          }
        );

        console.log(response.data.user.name);
        setAuthUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    getUser();
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <h3>Link your Twitter to start engaging</h3>
        <div className="card">
          <button onClick={handleLogin}>Link Now</button>

          <p>Access AudaXious Content Automation tools</p>
          <p>{isAuthenticated && "Welcome" + authUser.name}</p>
        </div>
      </>
    );
  }

  if (isAuthenticated) {
    return (
      <div style={{ width: "495px" }}>
        {manualActive ? (
          <ScheduleTweet authUser={authUser} />
        ) : (
          <GenerateTweet authUser={authUser} />
        )}
      </div>
    );
  }
}

export default Login;
