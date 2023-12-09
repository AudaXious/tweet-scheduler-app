import { useEffect } from "react";
import SignupSignin from "./SignupSignin";
import Login from "./Login";

export default function CreateAccountSignin({
  setLoggedinUser,
  loggedinUser,
  authUser,
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
    return <Login authUser={authUser} />;
  }

  if (!loggedinUser) {
    return <SignupSignin setLoggedinUser={setLoggedinUser} />;
  }
}
