import { useState } from "react";
import { auth } from "../firebase/config";
import { signoutUser } from "../firebase/firebaseMethods";

export default function Nav({
  authUser,
  handleManual,
  handleGenerate,
  setLoggedinUser,
  loggedinUser,
}) {
  async function handleLogout() {
    await signoutUser();
    setLoggedinUser(null);
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
          <span style={{ marginRight: "10px" }}> </span>
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
            onClick={handleManual}
          >
            Manual Tweet
          </button>
          <button
            style={{
              justifyContent: "center",
              height: "25px",
            }}
            onClick={handleGenerate}
          >
            Generate Tweet
          </button>

          <span style={{ marginRight: "10px" }}></span>
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
