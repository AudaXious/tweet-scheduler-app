import axios from "axios";
import { useState } from "react";
import { URLS } from "../constants/URL";

export default function ScheduleTweet({ onLogout, authUser }) {
  const [scheduleDate, setScheduleDate] = useState(""); // State for date
  const [tweetTime, setTweetTime] = useState("");
  const [enteredText, setEnteredText] = useState(""); // State for time
  const [upload, setUpload] = useState("");

  function handleUpload(event) {
    const file = event.target.files[0];
    setUpload(file);
  }

  const handleDateChange = (event) => {
    setScheduleDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;

    const selectedTimeDate = new Date(`${scheduleDate}T${selectedTime}`);

    const userDate = new Date();
    const userTimezoneOffset = userDate.getTimezoneOffset();

    selectedTimeDate.setUTCHours(selectedTimeDate.getUTCHours());
    selectedTimeDate.setUTCMinutes(selectedTimeDate.getUTCMinutes());
    console.log(userTimezoneOffset);

    const adjustedTimeString = selectedTimeDate.toISOString();
    // Now selectedTimeDate contains the time adjusted to UTC
    setTweetTime(adjustedTimeString);
  };

  const handleEnteredText = (event) => {
    setEnteredText(event.target.value);
  };

  async function handleSubmit() {
    const formData = new FormData();

    formData.append("tweet", enteredText);
    formData.append("tweet_at", tweetTime);
    if (upload) {
      formData.append("media", upload);
    }

    try {
      const response = await axios.post(URLS.tweet_URL, formData, {
        headers: {
          Authorization: `Bearer ${authUser.twitterAccess}`, // Add the authorization header
          // "Content-Type": "application/json", // Set the content type if required
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div style={{ width: "490px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h5 style={{ marginRight: "70px", alignItems: "center" }}>
          Enter Tweet and schedule it
        </h5>
      </div>
      <div className="flex flex-col">
        <p style={{ marginBottom: "5px" }}>Tweet</p>
        <textarea
          id="tweet"
          style={{
            height: "100px",
            width: "500px",
          }}
          placeholder="Enter Tweet Texts"
          onChange={handleEnteredText}
        />
        <p
          style={{
            marginTop: "0px",
            fontSize: "12px",
            marginLeft: "5px",
            color: enteredText.length > 240 ? "red" : "inherit",
          }}
        >
          {280 - enteredText.length}
        </p>
      </div>
      <div className="flex flex-col">
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Add Image</p>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
      <div>
        <p
          htmlFor="scheduleDate"
          style={{
            marginTop: "30px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          Schedule Tweet:
        </p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <p
              style={{
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Date
            </p>
            <input
              type="date"
              id="scheduleDate"
              name="scheduleDate"
              min={new Date().toISOString().split("T")[0]} // Sets today as the minimum date
              max={
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              } // Sets 30 days from now as maximum date
              onChange={handleDateChange}
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <p
              style={{
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Time
            </p>
            <input
              type="time"
              id="scheduleTime"
              name="scheduleTime"
              onChange={handleTimeChange}
            />
          </div>
        </div>
      </div>
      <button
        style={{ marginTop: "20px", alignItems: "stretch" }}
        onClick={handleSubmit}
      >
        Submit Tweet
      </button>
    </div>
  );
}
