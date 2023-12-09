export default function LinkedTwitter({ authUser }) {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      <h4>
        Linked Twitter:{" "}
        <a
          href={`https://twitter.com/${authUser.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {authUser.screenName}
        </a>
      </h4>
    </div>
  );
}
