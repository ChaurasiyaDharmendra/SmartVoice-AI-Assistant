// import axios from "axios";

// const geminiResponse = async (command, assistantName, userName) => {
//   try {
//     const API_KEY = process.env.GEMINI_API_KEY;

//     if (!API_KEY) {
//       throw new Error("❌ GEMINI_API_KEY missing in .env");
//     }

//     const apiUrl =
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

//     const prompt = `
// You are a virtual assistant named ${assistantName} created by ${userName}.
// You are a voice-enabled assistant.

// Reply ONLY in JSON:

// {
//   "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
//           "get-time" | "get-date" | "get-day" | "get-month" |
//           "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
//   "userInput": "<cleaned user input>",
//   "response": "<short spoken reply>"
// }

// Rules:
// - Only JSON
// - Short response
// - If asked who created you → say ${userName}

// User input:
// ${command}
// `;

//     const result = await axios.post(apiUrl, {
//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     return result.data.candidates[0].content.parts[0].text;
//   } catch (error) {
//     console.error("❌ Gemini API Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export default geminiResponse;

// 2nd vala 
// const geminiResponse = async (command, assistantName, userName) => {
//   try {
//     command = command.toLowerCase().trim();

//     // 👋 Greeting
//     if (command.includes("hello") || command.includes("hi")) {
//       return JSON.stringify({
//         type: "general",
//         userInput: command,
//         response: `Hello ${userName}, how can I help you?`
//       });
//     }

//     // 😊 How are you
//     if (command.includes("how are you")) {
//       return JSON.stringify({
//         type: "general",
//         userInput: command,
//         response: "I am fine and ready to help you 😊"
//       });
//     }

//     // 🕒 Time
//     if (command.includes("time")) {
//       return JSON.stringify({
//         type: "get-time",
//         userInput: command,
//         response: `Current time is ${new Date().toLocaleTimeString()}`
//       });
//     }

//     // 📅 Date
//     if (command.includes("date")) {
//       return JSON.stringify({
//         type: "get-date",
//         userInput: command,
//         response: `Today's date is ${new Date().toLocaleDateString()}`
//       });
//     }

//     // 📆 Day
//     if (command.includes("day")) {
//       return JSON.stringify({
//         type: "get-day",
//         userInput: command,
//         response: `Today is ${new Date().toLocaleDateString(undefined, { weekday: "long" })}`
//       });
//     }

//     // 📅 Month
//     if (command.includes("month")) {
//       return JSON.stringify({
//         type: "get-month",
//         userInput: command,
//         response: `Current month is ${new Date().toLocaleDateString(undefined, { month: "long" })}`
//       });
//     }

//     // 🔍 Google Search
//     if (command.includes("google")) {
//       return JSON.stringify({
//         type: "google-search",
//         userInput: command.replace("google", "").trim(),
//         response: "Searching on Google..."
//       });
//     }

//     // ▶️ YouTube
//     if (command.includes("youtube")) {
//       return JSON.stringify({
//         type: "youtube-search",
//         userInput: command.replace("youtube", "").trim(),
//         response: "Opening YouTube..."
//       });
//     }

//     // 📱 Instagram
//     if (command.includes("instagram")) {
//       return JSON.stringify({
//         type: "instagram-open",
//         userInput: command,
//         response: "Opening Instagram..."
//       });
//     }

//     // 📘 Facebook
//     if (command.includes("facebook")) {
//       return JSON.stringify({
//         type: "facebook-open",
//         userInput: command,
//         response: "Opening Facebook..."
//       });
//     }

//     // 🌦️ Weather
//     if (command.includes("weather")) {
//       return JSON.stringify({
//         type: "weather-show",
//         userInput: command,
//         response: "Showing weather details..."
//       });
//     }

//     // 🧮 Calculator
//     if (command.includes("calculate") || command.includes("calculator")) {
//       return JSON.stringify({
//         type: "calculator-open",
//         userInput: command,
//         response: "Opening Calculator..."
//       });
//     }

//     // 👤 Identity
//     if (command.includes("who created you") || command.includes("who made you")) {
//       return JSON.stringify({
//         type: "general",
//         userInput: command,
//         response: `I was created by ${userName}`
//       });
//     }

//     // 🤖 Default
//     return JSON.stringify({
//       type: "general",
//       userInput: command,
//       response: "Sorry, I didn't understand that. Please try again."
//     });

//   } catch (error) {
//     console.log("Assistant Error:", error);

//     return JSON.stringify({
//       type: "general",
//       userInput: command,
//       response: "Something went wrong. Please try again."
//     });
//   }
// };

// export default geminiResponse;

import axios from "axios";

export const geminiResponse = async (command, assistantName, userName) => {
  try {
    // 🔹 Simple predefined commands (fast response)
    if (command.includes("time")) {
      return {
        type: "get-time",
        userInput: command,
        response: `Current time is ${new Date().toLocaleTimeString()}`
      };
    }

    if (command.includes("youtube")) {
      return {
        type: "youtube-search",
        userInput: command,
        response: "Opening YouTube..."
      };
    }

    if (command.includes("google")) {
      return {
        type: "google-search",
        userInput: command,
        response: "Searching on Google..."
      };
    }

    if (command.includes("calculator")) {
      return {
        type: "calculator-open",
        userInput: command,
        response: "Opening Calculator..."
      };
    }

    // 🔹 AI Call (OpenRouter)
    const result = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // light model (free/cheap)
        messages: [
          {
            role: "system",
            content: `You are ${assistantName}, a helpful AI assistant.`
          },
          {
            role: "user",
            content: command
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText =
      result.data.choices[0].message.content || "Sorry, I didn't understand.";

    return {
      type: "general",
      userInput: command,
      response: aiText
    };
  } catch (error) {
    console.log("AI Error:", error.message);

    // 🔹 fallback (kabhi bhi crash nahi hoga)
    return {
      type: "general",
      userInput: command,
      response: "Sorry, AI is not available right now."
    };
  }
};