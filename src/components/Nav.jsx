export default function Nav({
  onLogout,
  authUser,
  handleManual,
  handleGenerate,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button
          style={{
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

        <span style={{ marginRight: "10px" }}>Welcome {authUser.name} </span>
        <button
          style={{
            justifyContent: "center",
            height: "25px",
          }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
