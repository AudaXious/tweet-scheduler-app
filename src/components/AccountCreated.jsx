export default function AccountCreated({ setIsloginScreen, setIsNewAccount }) {
  function handleSwitchToLogin() {
    setIsNewAccount(false);
    setIsloginScreen(true);
  }
  return (
    <div>
      <h2>Account Created</h2>
      <p>Verification email has been sent, please confirm it</p>
      <button onClick={handleSwitchToLogin}>Continue to Login</button>
    </div>
  );
}
