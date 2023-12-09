export default function LinkedTwitter({ authUser }) {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      <h4>
        Linked Twitter:{" "}
        <a
          href={`https://twitter.com/${authUser.screenName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {authUser.name}
        </a>
      </h4>
    </div>
  );
}
