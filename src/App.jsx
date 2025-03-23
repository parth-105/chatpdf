// import React, { useState } from 'react';
// import { FileUpload } from './components/FileUpload';
// import { Chat } from './components/Chat';
// import { UserIdInput } from './components/UserIdInput';
// import './styles/animations.css';
// import axios from 'axios';

// function App() {
//   const [userId, setUserId] = useState(null);
//   const [isFileUploaded, setIsFileUploaded] = useState(false);

// const handleFileUpload = async (file) => {
//   // Check if the file is a PDF
//   if (file.type !== 'application/pdf') {
//     alert('Only PDF files are allowed.');
//     return;
//   }

//   // Check if the file size is less than 500 KB
//   if (file.size > 500 * 1024) {
//     alert('File size must be less than 500 KB.');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('user_id', userId);

//   try {
//     const response = await axios.post('https://rag-backend-by4h.onrender.com/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     alert(response.data.message);
//     setIsFileUploaded(true);
//   } catch (error) {
//     // console.error('Error uploading PDF:', error.response.data.error);
//     alert('Error uploading PDF: ');
//   }
// };


 

//   const handleAskQuestion = async (question) => {
//     try {
//       console.log('vvvvv', question);
//       const response = await axios.post('https://rag-backend-by4h.onrender.com/ask', { question, user_id: userId });
//       console.log('ans', response);
//       return response.data.answer;
//     } catch (error) {
//       // console.error('Error asking question:', error.response.data.error);
//       alert('Error asking question: ');
//     }
//   };
  

//   if (!userId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
//         <UserIdInput onSubmit={setUserId} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <header className="text-center fade-in slide-down">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             PDF Question Answering
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Upload a PDF and ask questions about its content
//           </p>
//         </header>

//         <div className="fade-in slide-up">
//           {!isFileUploaded ? (
//             <FileUpload onFileUpload={handleFileUpload} />
//           ) : (
//             <Chat onAskQuestion={handleAskQuestion} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { Chat } from './components/Chat';
import './styles/animations.css';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  // Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const generateUserId = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let userId = 'u';
        for (let i = 0; i < 5; i++) {
          userId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return userId;
      };
      const newUserId = generateUserId();
      localStorage.setItem('user_id', newUserId);
      setUserId(newUserId);
      console.log('uid',userId)
    }
  }, []);

  const handleFileUpload = async (file) => {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    // Check if the file size is less than 500 KB
    if (file.size > 500 * 1024) {
      alert('File size must be less than 500 KB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

    try {
      const response = await axios.post('https://rag-backend-by4h.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setIsFileUploaded(true);
    } catch (error) {
      console.error('Error uploading PDF:', error.response.data.error);
      alert('Error uploading PDF: ',);
    }
  };

  const handleAskQuestion = async (question) => {
    try {
      const response = await axios.post('https://rag-backend-by4h.onrender.com/ask', { question, user_id: userId });
      return response.data.answer;
    } catch (error) {
      console.error('Error uploading PDF:', error.response.data.error);
      alert('Error asking question: ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center fade-in slide-down">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">PDF Question Answering</h1>
          <p className="text-gray-600 text-lg">Upload a PDF and ask questions about its content</p>
        </header>

        <div className="fade-in slide-up">
          {!isFileUploaded ? (
            <FileUpload onFileUpload={handleFileUpload} />
          ) : (
            <Chat onAskQuestion={handleAskQuestion} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;





// import React, { useState } from 'react';
// import { FileUpload } from './components/FileUpload';
// import { Chat } from './components/Chat';
// import { UserIdInput } from './components/UserIdInput';
// import './styles/animations.css';
// import axios from 'axios';

// function App() {
//   const [userId, setUserId] = useState(null);
//   const [isFileUploaded, setIsFileUploaded] = useState(false);

// const handleFileUpload = async (file) => {
//   // Check if the file is a PDF
//   if (file.type !== 'application/pdf') {
//     alert('Only PDF files are allowed.');
//     return;
//   }

//   // Check if the file size is less than 500 KB
//   if (file.size > 500 * 1024) {
//     alert('File size must be less than 500 KB.');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('user_id', userId);

//   try {
//     const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     alert(response.data.message);
//     setIsFileUploaded(true);
//   } catch (error) {
//      console.error('Error uploading PDF:', error.response.data.error);
//     alert('Error uploading PDF: ',error);
//   }
// };


 

//   const handleAskQuestion = async (question) => {
//     try {
//       console.log('vvvvv', question);
//       const response = await axios.post('http://127.0.0.1:5000/ask', { question, user_id: userId });
//       console.log('ans', response);
//       return response.data.answer;
//     } catch (error) {
//       // console.error('Error asking question:', error.response.data.error);
//       alert('Error asking question: ');
//     }
//   };
  

//   if (!userId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
//         <UserIdInput onSubmit={setUserId} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <header className="text-center fade-in slide-down">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             PDF Question Answering
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Upload a PDF and ask questions about its content
//           </p>
//         </header>

//         <div className="fade-in slide-up">
//           {!isFileUploaded ? (
//             <FileUpload onFileUpload={handleFileUpload} />
//           ) : (
//             <Chat onAskQuestion={handleAskQuestion} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

