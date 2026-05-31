# 🎨 AI Document Assistant - Frontend

A modern **React-based AI chat UI** for interacting with uploaded PDF documents using a RAG backend system.

---

## 🚀 Features

### 📄 Document Dashboard
- Upload PDF files
- View user documents
- Select document to chat

### 💬 AI Chat Interface
- Chat with PDF documents
- Real-time message UI
- User + AI message bubbles
- Chat history loading

### 🧠 AI Integration
- Query backend RAG system
- Document-specific responses
- Context-aware answers

### 👤 Authentication UI
- Login / Logout system
- HttpOnly cookie-based auth
- Protected routes

### 📦 UI/UX Features
- Dark SaaS theme
- Responsive layout
- Sidebar navigation
- Profile dropdown
- Smooth chat scrolling

---

## 🏗 Tech Stack

- React.js
- TypeScript
- TailwindCSS
- Axios
- React Router DOM

---

## 📁 Project Structure
src/
│
├── components/
│ ├── Chat/
│ ├── Documents/
│ ├── Upload/
│
├── pages/
│ ├── Dashboard.tsx
│ ├── Chat.tsx
│
├── api/
│ ├── axios.ts
│
├── context/
│ ├── auth-context.tsx


---

## 📡 Frontend Routes

- /login
- /dashboard

---

## 🔄 Core Flow

Login → Dashboard → Upload PDF → Select Document → Chat → Ask Questions → AI Response

---

## 💬 Chat System

- React state-based messages
- Backend history sync
- Auto-scroll latest message
- Loading indicator while AI responds

---

## 🔐 Authentication

- HttpOnly cookies
- Protected routes
- Auto session restore

---

## 🎨 UI Design System

- Dark SaaS UI
- TailwindCSS
- ChatGPT-style layout
- Responsive design

---

## ⚠️ Improvements

- Streaming responses
- Markdown rendering
- React Query integration
- Mobile polish

---

## 📦 API Integration

- POST /auth/login
- POST /auth/logout
- GET /users/me
- POST /documents/upload
- GET /documents
- DELETE /documents/:id
- POST /chats/query
- GET /chats/history

---

## 👨‍💻 Author

Aryan Yadav
Full Stack Developer (MERN + AI Systems)