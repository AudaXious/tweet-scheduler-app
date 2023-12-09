import { useState } from "react";
import { auth } from "../firebase/config";
import { signoutUser } from "../firebase/firebaseMethods";

export default function Nav({
  authUser,
  handleManual,
  handleGenerate,
  setLoggedinUser,
  loggedinUser,
  setManualActive,
}) {
  async function handleLogout() {
    await signoutUser();
    setLoggedinUser(null);
    window.open("https://twitter-auth.audaxious.com/auth/logout", "_self");
  }

  if (!authUser) {
    return (
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <p style={{ marginRight: "10px", fontSize: "12px" }}>
            {loggedinUser.email}{" "}
          </p>
          <button
            style={{
              justifyContent: "center",
              height: "25px",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  if (authUser) {
    return (
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              //  position: "absolute",
              justifyContent: "center",
              height: "25px",
            }}
            onClick={() => setManualActive(true)}
          >
            Manual Tweet
          </button>
          <button
            style={{
              justifyContent: "center",
              height: "25px",
            }}
            onClick={() => setManualActive(false)}
          >
            Generate Tweet
          </button>

          <span style={{ marginRight: "10px", fontSize: "12px" }}>
            {loggedinUser.email}
          </span>
          <button
            style={{
              justifyContent: "center",
              height: "25px",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
