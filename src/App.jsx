import { useState } from "react";

import CreateAccountSignin from "./pages/CreateAccountSignin";
import Nav from "./components/Nav";
import LinkedTwitter from "./components/LinkedTwitter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [authUser, setAuthUser] = useState();
  return (
    <div style={{ marginLeft: "50px", marginTop: "50px", width: "495px" }}>
      {loggedinUser && (
        <Nav
          setLoggedinUser={setLoggedinUser}
          authUser={authUser}
          loggedinUser={loggedinUser}
        />
      )}
      {loggedinUser && authUser && <LinkedTwitter />}
      <CreateAccountSignin
        setIsLoggedIn={setIsLoggedIn}
        loggedinUser={loggedinUser}
        setLoggedinUser={setLoggedinUser}
        authUser={authUser}
        setAuthUser={setAuthUser}
      />
    </div>
  );
}

export default App;
