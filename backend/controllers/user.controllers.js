// import uploadOnCloudinary from "../config/cloudinary.js"
// //import geminiResponse from "../gemini.js"
// import { geminiResponse } from "../gemini.js"
// import User from "../models/user.model.js"
// import moment from "moment"
//  export const getCurrentUser=async (req,res)=>{
//     try {
//         const userId=req.userId
//         const user=await User.findById(userId).select("-password")
//         if(!user){
// return res.status(400).json({message:"user not found"})
//         }

//    return res.status(200).json(user)     
//     } catch (error) {
//        return res.status(400).json({message:"get current user error"}) 
//     }
// }

// export const updateAssistant=async (req,res)=>{
//    try {
//       const {assistantName,imageUrl}=req.body
//       let assistantImage;
// if(req.file){
//    assistantImage=await uploadOnCloudinary(req.file.path)
// }else{
//    assistantImage=imageUrl
// }

// const user=await User.findByIdAndUpdate(req.userId,{
//    assistantName,assistantImage
// },{new:true}).select("-password")
// return res.status(200).json(user)

      
//    } catch (error) {
//        return res.status(400).json({message:"updateAssistantError user error"}) 
//    }
// }


// export const askToAssistant=async (req,res)=>{
//    try {
//       const {command}=req.body
//       const user=await User.findById(req.userId);
//       user.history.push(command)
//       user.save()
//       const userName=user.name
//       const assistantName=user.assistantName
//       const result=await geminiResponse(command,assistantName,userName)

//       const jsonMatch=result.match(/{[\s\S]*}/)
//       if(!jsonMatch){
//          return res.ststus(400).json({response:"sorry, i can't understand"})
//       }
//       const gemResult=JSON.parse(jsonMatch[0])
//       console.log(gemResult)
//       const type=gemResult.type

//       switch(type){
//          case 'get-date' :
//             return res.json({
//                type,
//                userInput:gemResult.userInput,
//                response:`current date is ${moment().format("YYYY-MM-DD")}`
//             });
//             case 'get-time':
//                 return res.json({
//                type,
//                userInput:gemResult.userInput,
//                response:`current time is ${moment().format("hh:mm A")}`
//             });
//              case 'get-day':
//                 return res.json({
//                type,
//                userInput:gemResult.userInput,
//                response:`today is ${moment().format("dddd")}`
//             });
//             case 'get-month':
//                 return res.json({
//                type,
//                userInput:gemResult.userInput,
//                response:`today is ${moment().format("MMMM")}`
//             });
//       case 'google-search':
//       case 'youtube-search':
//       case 'youtube-play':
//       case 'general':
//       case  "calculator-open":
//       case "instagram-open": 
//        case "facebook-open": 
//        case "weather-show" :
//          return res.json({
//             type,
//             userInput:gemResult.userInput,
//             response:gemResult.response,
//          });

//          default:
//             return res.status(400).json({ response: "I didn't understand that command." })
//       }
     

//    } catch (error) {
//   return res.status(500).json({ response: "ask assistant error" })
//    }
// }

// import uploadOnCloudinary from "../config/cloudinary.js";
// import User from "../models/user.model.js";
// import moment from "moment";
// import axios from "axios";

// /* ================= CURRENT USER ================= */
// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");

//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "get current user error" });
//   }
// };

// /* ================= UPDATE ASSISTANT ================= */
// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;

//     let assistantImage;
//     if (req.file) {
//       assistantImage = await uploadOnCloudinary(req.file.path);
//     } else {
//       assistantImage = imageUrl;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantName, assistantImage },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "updateAssistant error" });
//   }
// };

// /* ================= MAIN AI FUNCTION ================= */
// export const askToAssistant = async (req, res) => {
//   try {
//     const { command } = req.body;

//     const user = await User.findById(req.userId);

//     // save history
//     user.history.push(command);
//     await user.save();

//     const lower = command.toLowerCase();

//       lower.includes("who created you") ||
//   lower.includes("kisne banaya") ||
//   lower.includes("who made you")
//    } {
//   return res.json({
//     type: "general",
//     userInput: command,
//     response: "I was created by Dharmendra Chaurasiya 😎"
//   });


//     /* ================= COMMANDS ================= */

//     if (lower.includes("youtube")) {
//       return res.json({
//         type: "youtube-search",
//         userInput: command,
//         response: "Opening YouTube..."
//       });
//     }

//     if (lower.includes("google")) {
//       return res.json({
//         type: "google-search",
//         userInput: command,
//         response: "Searching on Google..."
//       });
//     }

//     if (lower.includes("instagram")) {
//       return res.json({
//         type: "instagram-open",
//         userInput: command,
//         response: "Opening Instagram..."
//       });
//     }

//     if (lower.includes("facebook")) {
//       return res.json({
//         type: "facebook-open",
//         userInput: command,
//         response: "Opening Facebook..."
//       });
//     }

//     if (lower.includes("calculator")) {
//       return res.json({
//         type: "calculator-open",
//         userInput: command,
//         response: "Opening Calculator..."
//       });
//     }

//     if (lower.includes("weather")) {
//       return res.json({
//         type: "weather-show",
//         userInput: command,
//         response: "Showing weather..."
//       });
//     }

//     if (lower.includes("time")) {
//       return res.json({
//         type: "get-time",
//         userInput: command,
//         response: `Current time is ${moment().format("hh:mm A")}`
//       });
//     }

//     if (lower.includes("date")) {
//       return res.json({
//         type: "get-date",
//         userInput: command,
//         response: `Today's date is ${moment().format("YYYY-MM-DD")}`
//       });
//     }

//     if (lower.includes("day")) {
//       return res.json({
//         type: "get-day",
//         userInput: command,
//         response: `Today is ${moment().format("dddd")}`
//       });
//     }

//     /* ================= AI RESPONSE ================= */

//     const aiRes = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openai/gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: "You are a smart AI assistant. Answer clearly and shortly."
//           },
//           {
//             role: "user",
//             content: command
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const reply =
//       aiRes.data.choices[0].message.content ||
//       "Sorry, I didn't understand.";

//     return res.json({
//       type: "general",
//       userInput: command,
//       response: reply
//     });

//   } catch (error) {
//     console.log("AI ERROR:", error.message);

//     return res.json({
//       type: "general",
//       userInput: req.body.command,
//       response: "AI error aa gaya, try again."
//     });
//   }
// };

import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import moment from "moment";
import axios from "axios";

/* ================= CURRENT USER ================= */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "get current user error" });
  }
};

/* ================= UPDATE ASSISTANT ================= */
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;

    let assistantImage;
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "updateAssistant error" });
  }
};

/* ================= MAIN AI FUNCTION ================= */
export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    const user = await User.findById(req.userId);

    // save history
    user.history.push(command);
    await user.save();

    const lower = command.toLowerCase();

    // 👉 LANGUAGE DETECTION
    const isHindi = /[ऀ-ॿ]/.test(command) || lower.includes("kya") || lower.includes("hai");

    /* ================= CREATOR RESPONSE ================= */
    if (
      lower.includes("who created you") ||
      lower.includes("kisne banaya") ||
      lower.includes("who made you")
    ) {
      return res.json({
        type: "general",
        userInput: command,
        response: "I was created by Dharmendra Chaurasiya 😎"
      });
    }

    /* ================= COMMANDS ================= */

    if (lower.includes("youtube")) {
      return res.json({
        type: "youtube-search",
        userInput: command,
        response: "Opening YouTube..."
      });
    }

    if (lower.includes("google")) {
      return res.json({
        type: "google-search",
        userInput: command,
        response: "Searching on Google..."
      });
    }

    if (lower.includes("instagram")) {
      return res.json({
        type: "instagram-open",
        userInput: command,
        response: "Opening Instagram..."
      });
    }

    if (lower.includes("facebook")) {
      return res.json({
        type: "facebook-open",
        userInput: command,
        response: "Opening Facebook..."
      });
    }

    if (lower.includes("calculator")) {
      return res.json({
        type: "calculator-open",
        userInput: command,
        response: "Opening Calculator..."
      });
    }

    if (lower.includes("weather")) {
      return res.json({
        type: "weather-show",
        userInput: command,
        response: "Showing weather..."
      });
    }

    if (lower.includes("time")) {
      return res.json({
        type: "get-time",
        userInput: command,
        response: `Current time is ${moment().format("hh:mm A")}`
      });
    }

    if (lower.includes("date")) {
      return res.json({
        type: "get-date",
        userInput: command,
        response: `Today's date is ${moment().format("YYYY-MM-DD")}`
      });
    }

    if (lower.includes("day")) {
      return res.json({
        type: "get-day",
        userInput: command,
        response: `Today is ${moment().format("dddd")}`
      });
    }

    /* ================= AI RESPONSE ================= */

    const aiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: isHindi
              ? "Tum ek smart AI assistant ho. Simple Hindi me jawab do."
              : "You are a smart AI assistant. Answer in simple Indian English (easy words, not complex)."
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

    const reply =
      aiRes.data?.choices?.[0]?.message?.content ||
      (isHindi ? "Mujhe samajh nahi aaya." : "Sorry, I didn't understand.");

    return res.json({
      type: "general",
      userInput: command,
      response: reply
    });

  } catch (error) {
    console.log("AI ERROR:", error.message);

    return res.json({
      type: "general",
      userInput: req.body.command,
      response: "AI error aa gaya, try again."
    });
  }
};