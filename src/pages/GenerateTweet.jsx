import axios from "axios";
import { useState } from "react";
import { URLS } from "../constants/URL";

export default function GenerateTweet({ onLogout, authUser }) {
  const [scheduleDate, setScheduleDate] = useState(""); // State for date
  const [tweetTime, setTweetTime] = useState("");
  const [enteredText, setEnteredText] = useState(""); // State for time
  const [upload, setUpload] = useState("");
  const [tweets, setTweets] = useState({});

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

  async function handleGenerate() {
    try {
      const response = await axios.post(
        "https://audaxious-130e2398fbd3.herokuapp.com/generate_tweet/",
        {
          number_of_texts: "4",
          keywords: "hello world was first used in programming in the year",
          sentiment: "Neutral",
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.twitterAccess}`, // Add the authorization header
            "Content-Type": "application/json", // Set the content type if required
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setTweets(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

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
    <div className="flex flex-col">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginRight: "70px", alignItems: "center" }}>
          Auto generate tweets
        </h3>
      </div>
      <div className="flex flex-col">
        <p style={{ marginBottom: "5px" }}>Number of tweets to generate</p>

        <input
          id="number"
          style={{}}
          placeholder="Enter a Number"
          onChange={handleEnteredText}
        />
      </div>
      <div className="flex flex-col">
        <p style={{ marginBottom: "5px" }}>
          Enter key words/phrases (separate with comma)
        </p>

        <textarea
          id="tweet"
          style={{
            height: "60px",
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
        ></p>
      </div>
      <div className="flex flex-col">
        <p style={{ marginBottom: "5px" }}>Choose Sentiment</p>

        <select multiple name="selections" id="selections">
          <option value="option1">Positive</option>
          <option value="option2">Negative</option>
          <option value="option2">Neutral</option>
        </select>
      </div>

      <button
        style={{ marginTop: "20px", alignItems: "stretch" }}
        onClick={handleGenerate}
      >
        Generate Tweets
      </button>
      <div>
        <h3>Generated Tweets</h3>
        {Object.values(tweets).map((tweet, index) => (
          <p key={index}>{tweet}</p>
        ))}
      </div>
    </div>
  );
}
