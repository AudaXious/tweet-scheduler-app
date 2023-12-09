import { useEffect, useState } from "react";
import {
  createUserWithEmail,
  signinUserWithEmail,
  googleSignin,
} from "../firebase/firebaseMethods";
import Loading from "../components/Loading";
import AccountCreated from "../components/AccountCreated";

export default function SignupSignin({ setLoggedinUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginScreen, setIsloginScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);

  function handleLoginSreen() {
    setIsloginScreen((isLoginScreen) => !isLoginScreen);
  }

  async function signupHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    await createUserWithEmail(email, password);
    setIsLoading(false);
    setIsNewAccount(true);
  }

  async function signinHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    await signinUserWithEmail(email, password);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setLoggedinUser(storedUser);
    setIsLoading(false);
  }

  async function googleSigninHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    await googleSignin();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setLoggedinUser(storedUser);
    setIsLoading(false);
  }

  if (isNewAccount) {
    return (
      <AccountCreated
        setIsloginScreen={setIsloginScreen}
        setIsNewAccount={setIsNewAccount}
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }
  if (isLoginScreen) {
    return (
      <div style={{ width: "320px" }}>
        <div style={{}}>
          <h2>Sign in</h2>
          <p onClick={handleLoginSreen}>
            <a href="#!">Create account instead</a>
          </p>
        </div>

        <div className="card">
          <form onSubmit={signinHandler}>
            <div
              style={{
                display: "flex",
                width: "320px",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <input
                style={{ width: "220px" }}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "320px",

                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <input
                style={{ width: "220px" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                style={{
                  backgroundColor: "lightblue",
                  marginBottom: "10px",
                  width: "230px",
                }}
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>

          <div
            style={{
              display: "flex",
            }}
          >
            <button
              onClick={googleSigninHandler}
              style={{
                backgroundColor: "lightyellow",
                width: "230px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Continue with google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "320px" }}>
      <div style={{}}>
        <h2>Create Account</h2>
        <p onClick={handleLoginSreen}>
          <a href="#!">login instead</a>
        </p>
      </div>

      <div className="card">
        <form onSubmit={signupHandler}>
          <div
            style={{
              display: "flex",
              width: "320px",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              style={{ width: "220px" }}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "320px",

              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              style={{ width: "220px" }}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <button
              style={{
                backgroundColor: "lightblue",
                marginBottom: "10px",
                width: "230px",
              }}
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>

        <div
          style={{
            display: "flex",
          }}
        >
          <button
            onClick={googleSigninHandler}
            style={{
              backgroundColor: "lightyellow",
              width: "230px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
}
