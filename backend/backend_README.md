# 📦 AI Document Assistant - Backend

A production-style **AI-powered RAG backend system** that allows users to upload PDFs and chat with them using vector search (Qdrant) + embeddings + LLM.

---

## 🚀 Features

### 🔐 Authentication
- JWT-based authentication
- HttpOnly cookies (access + refresh tokens)
- Role-based protection middleware

### 📄 Document Processing
- PDF upload using Multer
- PDF parsing into chunks
- Embedding generation per chunk
- Vector storage in Qdrant

### 🤖 AI Chat (RAG System)
- Question answering based on uploaded documents
- Semantic search using embeddings
- Context-aware LLM responses
- Document-specific chat isolation

### 🧠 Vector Database (Qdrant)
- Stores embeddings with metadata:
  - userId
  - documentId
  - chunkIndex
  - text
- Secure multi-tenant filtering

### 💬 Chat System
- Chat history per document
- Persistent conversations
- Query + response storage

### 🗑 Document Management
- Upload PDF
- List user documents
- Delete document + cleanup:
  - MongoDB record
  - File system
  - Qdrant vectors

---

## 🏗 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Qdrant Vector DB
- PDF parsing service
- Embedding service (Google Gemini / OpenAI compatible)
- JWT Authentication
- Multer (file upload)

---

## 📁 Project Structure

src/
│
├── modules/
│ ├── auth/
│ ├── user/
│ ├── document/
│ ├── chat/
│
├── services/
│ ├── pdf.service.ts
│ ├── embedding.service.ts
│
├── config/
│ ├── qdrant.ts
│ ├── dotenv.ts
│
├── middlewares/




---

## 📡 API Endpoints

### Auth
- POST /api/v1/auth/login
- POST /api/v1/auth/register
- POST /api/v1/auth/logout

### User
- GET /api/v1/users/me

### Documents
- POST /api/v1/documents/upload
- GET /api/v1/documents
- DELETE /api/v1/documents/:documentId

### Chat
- POST /api/v1/chats/query
- GET /api/v1/chats/history

---

## 🔐 Security Design

- User-level isolation using `userId`
- Document ownership validation
- Qdrant filters (userId + documentId)
- HttpOnly cookies (no token exposure)
- Input validation using Zod

---

## 🧠 RAG Pipeline

PDF Upload  
→ Chunking  
→ Embedding Generation  
→ Store in Qdrant  
→ User Question  
→ Vector Search (filtered)  
→ LLM Response  

---

## 🗄 Environment Variables
PORT=    
MONGODB_URI=         
JWT_ACCESS_SECRET=        
JWT_REFRESH_SECRET=        
QDRANT_URL=         
QDRANT_API_KEY=         
QDRANT_COLLECTION=         


---

## 📌 Status

- Backend: Production-ready  
- RAG pipeline: Working  
- Multi-user isolation: Implemented  
- Optional: caching, streaming, rate limiting  

---

## 👨‍💻 Author

Aryan Yadav
Full Stack Developer (MERN + AI Systems)