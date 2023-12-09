import { useEffect } from "react";
import SignupSignin from "./SignupSignin";
import Login from "./Login";

export default function CreateAccountSignin({
  setLoggedinUser,
  loggedinUser,
  authUser,
  setAuthUser,
  manualActive,
}) {
  useEffect(() => {
    async function getAuthUser() {
      const storedUser = await JSON.parse(localStorage.getItem("user"));
      setLoggedinUser(storedUser);
      console.log(storedUser);
    }
    getAuthUser();
  }, []);

  if (loggedinUser) {
    return (
      <Login
        authUser={authUser}
        setAuthUser={setAuthUser}
        manualActive={manualActive}
      />
    );
  }

  if (!loggedinUser) {
    return <SignupSignin setLoggedinUser={setLoggedinUser} />;
  }
}
