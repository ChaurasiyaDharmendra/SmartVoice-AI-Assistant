// import axios from 'axios'
// import React, { createContext, useEffect, useState } from 'react'
// export const userDataContext=createContext()
// function UserContext({children}) {
//    // const serverUrl="http://localhost:8000"
//    const serverUrl = "https://smartvoice-ai-assistant.onrender.com"
//     const [userData,setUserData]=useState(null)
//     const [frontendImage,setFrontendImage]=useState(null)
//      const [backendImage,setBackendImage]=useState(null)
//      const [selectedImage,setSelectedImage]=useState(null)
//     const handleCurrentUser=async ()=>{
//         try {
//             const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
//             setUserData(result.data)
//             console.log(result.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const getGeminiResponse=async (command)=>{
// try {
//   const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
//   return result.data
// } catch (error) {
//   console.log(error)
// }
//     }

//     useEffect(()=>{
// handleCurrentUser()
//     },[])
//     const value={
// serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
//     }
//   return (
//     <div>
//     <userDataContext.Provider value={value}>
//       {children}
//       </userDataContext.Provider>
//     </div>
//   )
// }

// export default UserContext

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {

  // ✅ Render backend URL
  const serverUrl = "https://smartvoice-ai-assistant.onrender.com";

  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= CURRENT USER ================= */
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });

      setUserData(result.data);
      console.log("USER:", result.data);

    } catch (error) {
      console.log("USER ERROR:", error.response?.data || error.message);
    }
  };

  /* ================= AI RESPONSE ================= */
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );

      return result.data;

    } catch (error) {
      console.log("AI ERROR:", error.response?.data || error.message);

      return {
        type: "general",
        userInput: command,
        response: "Server error aa gaya 😢"
      };
    }
  };

  /* ================= LOAD USER ================= */
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;