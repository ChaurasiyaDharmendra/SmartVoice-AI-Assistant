import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");

  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);

  /* ================= LOGOUT ================= */
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (err) {
      setUserData(null);
    }
  };

  /* ================= SPEAK ================= */
  const speak = (text) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";

    isSpeakingRef.current = true;

    utter.onend = () => {
      isSpeakingRef.current = false;
      setAiText("");
    };

    window.speechSynthesis.speak(utter);
  };

  /* ================= START LISTEN ================= */
  const startRecognition = () => {
    if (isSpeakingRef.current) return;

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.warn("Mic already running");
    }
  };

  /* ================= COMMAND HANDLER ================= */
  const handleCommand = (data) => {
    if (!data) return;

    const { type, userInput, response } = data;

    setAiText(response);
    speak(response);

    if (type === "google-search") {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
        "_blank"
      );
    }

    if (type === "youtube-search" || type === "youtube-play") {
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          userInput
        )}`,
        "_blank"
      );
    }

    if (type === "calculator-open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }

    if (type === "instagram-open") {
      window.open("https://www.instagram.com", "_blank");
    }

    if (type === "facebook-open") {
      window.open("https://www.facebook.com", "_blank");
    }

    if (type === "weather-show") {
      window.open("https://www.google.com/search?q=weather", "_blank");
    }
  };

  /* ================= SPEECH ================= */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setUserText(transcript);

      try {
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
      } catch (err) {
        console.error(err);
      }
    };

    return () => {
      recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  /* ================= UI ================= */
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center gap-6"
      style={{
        background: "linear-gradient(135deg, #020617, #0c4a6e, #020617)",
      }}
    >
      {/* Buttons */}
      <button
        onClick={handleLogOut}
        className="absolute top-5 right-5 bg-white px-6 py-2 rounded-full hover:scale-105 transition"
      >
        Log Out
      </button>

      <button
        onClick={() => navigate("/customize")}
        className="absolute top-20 right-5 bg-white px-6 py-2 rounded-full hover:scale-105 transition"
      >
        Customize your Assistant
      </button>

      {/* Image */}
      <div className="w-[300px] h-[400px] rounded-xl overflow-hidden shadow-[0_0_40px_#0ea5e9]">
        <img
          src={userData?.assistantImage}
          alt="assistant"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h1 className="text-white text-xl font-semibold tracking-wide">
        I'm {userData?.assistantName}
      </h1>

      {/* Mic */}
      <img
        src={listening ? aiImg : userImg}
        alt="mic"
        className="w-[180px] cursor-pointer hover:scale-110 transition"
        onClick={startRecognition}
      />

      {/* Text */}
      <h1 className="text-white text-center px-6 text-lg max-w-[600px]">
        {userText || aiText}
      </h1>
    </div>
  );
}

export default Home;