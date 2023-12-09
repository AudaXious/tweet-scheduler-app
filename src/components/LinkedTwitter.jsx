export default function LinkedTwitter({ authUser }) {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      <h4>Linked Twitter: {authUser.name}</h4>
    </div>
  );
}
