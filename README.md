# 🤖 Care Bridges AI Chatbot

> Frontend for 24/7 AI expert consultation service for long-term care workers

### 🎙️ [Upgrounder 1st Generation] Care Bridges AI Chatbot Frontend Repository

* This frontend repository provides an interactive chat interface for long-term care workers to ask work-related questions.
* Built as a React-based SPA, it offers features such as category-based AI consultation, chat history management, and user authentication.
* Configured with Vite-based build system, responsive design using Tailwind CSS, and automated deployment environment with Netlify.

---

## 🛠️ Technology Stack

### 📌 Language & Framework

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

### 📌 Build Tool & Styling

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 📌 State Management & Routing

![React Hooks](https://img.shields.io/badge/React_Hooks-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### 📌 HTTP Client & API

![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### 📌 DevOps & Deployment

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

### 📌 Version Control

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

### 🔎 Technical Details

* **Language:** JavaScript (ES6+)
* **Framework:** React 19.1.0
* **Build Tool:** Vite 7.0.2
* **Styling:** Tailwind CSS 3.4.17
* **Routing:** React Router DOM 7.6.3
* **HTTP Client:** Axios 1.10.0
* **Deployment:** Netlify (Automated deployment)
* **Package Manager:** npm

---

# 1. Project Structure and Key Source Code Description

📁 Project Structure

```
carebridges-frontend/
├── src/
│   ├── api/                    # API communication modules
│   │   ├── auth.js             # Authentication API (login, signup, password recovery)
│   │   ├── chat.js             # Chat API (message sending, conversation retrieval)
│   │   ├── user.js             # User information API
│   │   ├── faq.js              # FAQ API
│   │   ├── axios.js            # Axios instance configuration (with interceptors)
│   │   └── ...
│   ├── components/             # Reusable components
│   │   ├── chat/               # Chat-related components
│   │   │   ├── ChatContainer.jsx    # Chat container (message list + input)
│   │   │   ├── MessageList.jsx       # Message list display
│   │   │   ├── MessageInput.jsx      # Message input component
│   │   │   ├── AIMessage.jsx          # AI response message component
│   │   │   └── QuickQuestions.jsx    # Quick question buttons
│   │   ├── category/           # Category-related components
│   │   │   └── CategoryGrid.jsx      # Category grid display
│   │   ├── Header.jsx          # Main header (after login)
│   │   ├── LoginHeader.jsx     # Login page header
│   │   ├── LeftSidebar.jsx     # Left sidebar (chat history)
│   │   ├── RightSidebar.jsx    # Right sidebar (resource library)
│   │   ├── FaqPopup.jsx        # FAQ popup
│   │   └── SignupPopup.jsx     # Signup popup
│   ├── pages/                  # Page components
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── chat/
│   │   │   └── ChatPage.jsx    # Chat page
│   │   ├── Login.jsx          # Login page
│   │   ├── signup/             # Step-by-step signup pages
│   │   │   ├── Step1.jsx       # Signup step 1
│   │   │   ├── Step2.jsx       # Signup step 2 (information input)
│   │   │   └── Step3.jsx       # Signup step 3 (completion)
│   │   ├── FindId.jsx         # Find email
│   │   ├── FindPw.jsx         # Find password
│   │   ├── ResetPassword.jsx  # Reset password
│   │   └── MyPage.jsx         # My page
│   ├── hooks/                  # Custom Hooks
│   │   ├── useChatMessages.js # Chat message management hook
│   │   ├── useCategoryData.js # Category data management hook
│   │   └── useApi.js          # Common API call hook
│   ├── App.jsx                # Main app component (routing configuration)
│   ├── main.jsx               # React app entry point
│   └── index.css              # Global styles
├── public/                    # Static files
│   ├── logo.png               # Logo image
│   ├── chatcharacter.png      # AI character image
│   └── ...
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── netlify.toml               # Netlify deployment configuration
└── README.md                  # Project documentation
```

📁 Key Source Code Description

| Path                       | Description                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| **App.jsx**               | Routing configuration using React Router and page component connections                                                          |
| **pages/Dashboard.jsx**  | Main dashboard page - category selection, AI character display, chat input area                                                |
| **pages/chat/ChatPage.jsx** | Category-based chat page - real-time AI consultation interface, message history management                                              |
| **components/chat/ChatContainer.jsx** | Chat container - integrated management of message list and input area                                                          |
| **components/LeftSidebar.jsx** | Left sidebar - chat history list, new conversation start functionality                                                          |
| **components/RightSidebar.jsx** | Right sidebar - resource library (latest regulation updates, usage guide, FAQ, etc.)                                                  |
| **api/chat.js**          | Chat-related API functions - message sending, conversation retrieval, conversation creation                                                          |
| **api/auth.js**          | Authentication-related API functions - login, signup, password recovery, user information retrieval                                             |
| **api/axios.js**         | Axios instance configuration - request/response interceptors, token management, error handling                                                      |
| **hooks/useChatMessages.js** | Chat message state management custom hook - message sending, receiving, history loading                                                |
| **hooks/useCategoryData.js** | Category data management custom hook - category list retrieval and management                                                        |

---

# 2. How to build and install

### 1. Clone Repository

```bash
git clone https://github.com/carebridges-chatbot/carebridges-frontend.git
cd carebridges-frontend  # Move to the project directory after cloning
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Configuration (.env)

Create a `.env` file in the project root directory and write environment variables in the following format:

```env
# Backend API URL
VITE_API_BASE_URL=your_backend_api_url
```

> ⚠️ The .env file is not included in GitHub for security reasons.  
> You must set the appropriate API URL for the actual service environment.

### 4. Run Development Server

```bash
npm run dev
```

The server runs on `http://localhost:3000` by default.

### 5. Production Build

```bash
npm run build
```

Built files are generated in the `dist/` directory.

### 6. Preview Build

```bash
npm run preview
```

You can preview the production build locally.

---

# 3. Key Features

### 🤖 Real-time Chat with AI Chatbot

* Category-based professional consultation (employment/termination, salary calculation, regulation changes, etc.)
* Real-time message sending and response receiving
* Conversation context maintenance

### 📋 Category-based Consultation

* Long-term care worker employment/termination
* Salary calculation
* 2025 regulation changes
* Other work-related questions

### 💬 Chat History Management

* View previous conversation list
* Restore conversation history
* Start new conversation

### ❓ FAQ Popup System

* Frequently asked questions list
* Category-based FAQ provision
* Quick answer confirmation

### 📱 Responsive Design

* Support for mobile, tablet, and desktop
* Responsive layout based on Tailwind CSS
* User-friendly UI/UX

### 🔐 User Authentication System

* Email/password login
* Signup (3-step process)
* Find email / Find password
* Password reset
* My page

### 📚 Resource Library

* Latest regulation updates (Notion link)
* Usage guide (Notion link)
* FAQ quick access
* Care Bridges exclusive materials (Naver blog)

---

# 4. API Structure

### 📡 Key API Endpoints

| API Path | Method | Description |
| ------- | ------ | --- |
| `/api/auth/login` | POST | Login |
| `/api/auth/register` | POST | Signup |
| `/api/auth/find-email` | POST | Find email |
| `/api/auth/find-password` | POST | Find password |
| `/api/auth/reset-password` | POST | Reset password |
| `/api/user/info` | GET | Get user information |
| `/api/chat/conversations` | GET | Get conversation list |
| `/api/chat/conversations/:id` | GET | Get specific conversation |
| `/api/chat/messages` | POST | Send message |
| `/api/faq` | GET | Get FAQ list |

### 🔐 Authentication Method

* JWT-based token authentication
* Sent in `Authorization` header as `Bearer {token}` format
* Token stored in `localStorage`
* Automatic token injection through Axios interceptors

---

# 5. Deployment

### 🚀 Netlify Deployment

This project is configured for automated deployment through Netlify.

* **Deployment Configuration:** See `netlify.toml` file
* **Build Command:** `npm ci && npm run build`
* **Publish Directory:** `dist`
* **Redirects:** All paths redirect to `index.html` for SPA routing

### 📝 Deployment Process

1. Push code to GitHub
2. Netlify automatically builds and deploys
3. Site automatically updates after deployment completion

---

# 6. Open Source Used

This project is developed based on the following open source libraries:

* **React**  
   * Purpose: UI library for building user interfaces
* **React Router DOM**  
   * Purpose: Client-side routing and page navigation management
* **Vite**  
   * Purpose: Fast development server and production build tool
* **Tailwind CSS**  
   * Purpose: Utility-based CSS framework for implementing responsive design
* **Axios**  
   * Purpose: HTTP client for communication with backend API
* **React Responsive**  
   * Purpose: Media query hooks for responsive design

---

## 📞 Contact

If you have any questions about the project, please create an issue.

---

## 📄 License

This project is part of the Upgrounder 1st Generation project.
