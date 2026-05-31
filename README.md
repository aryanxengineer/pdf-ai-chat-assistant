# 🚀 AI Document Assistant

### RAG-Powered PDF Chat System with Qdrant & LLMs

> A production-grade AI-powered document intelligence platform that enables users to upload PDFs and interact with them through natural language conversations using Retrieval-Augmented Generation (RAG), vector search, and Large Language Models.

---

## 📌 Overview

AI Document Assistant transforms static PDF documents into intelligent, searchable knowledge bases.

Users can upload documents, ask questions in natural language, and receive context-aware AI-generated responses grounded in the actual content of their files.

The system leverages:

* 📄 PDF Processing
* 🧠 Embedding Generation
* 🧬 Qdrant Vector Database
* 🤖 Large Language Models (Gemini/OpenAI)
* 🔍 Semantic Search
* 💬 Context-Aware Conversational AI

---

## ✨ Key Features

### 📄 Smart Document Processing

* PDF Upload Support
* Automatic Text Extraction
* Intelligent Text Chunking
* Metadata Generation

### 🧠 AI-Powered Retrieval

* Embedding Generation
* Semantic Vector Search
* Context Retrieval
* High-Relevance Document Matching

### 💬 Conversational Document Chat

* Ask Questions About Documents
* Context-Aware Responses
* Persistent Chat History
* Multi-Document Support

### 🔐 Secure Authentication

* JWT Authentication
* Refresh Tokens
* HttpOnly Cookies
* Protected Routes

### 🧬 Vector Search Engine

* Qdrant Integration
* Metadata Filtering
* Fast Similarity Search
* User-Level Data Isolation

---

# 🏗️ System Architecture

```text
┌─────────────────────────────┐
│ React + Tailwind Frontend   │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ Express + TypeScript API    │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ Service Layer (OOP)         │
│ - Auth Service              │
│ - Document Service          │
│ - Chat Service              │
│ - Embedding Service         │
│ - Qdrant Service            │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ Qdrant Vector Database      │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ Gemini / OpenAI LLM         │
└─────────────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* TypeScript
* Tailwind CSS
* Axios
* Context API

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

## AI Layer

* Gemini API
* OpenAI API
* LangChain

## Vector Database

* Qdrant

## Authentication

* JWT
* Refresh Tokens
* HttpOnly Cookies

---

# 📂 Backend Architecture

```text
src
│
├── modules
│   ├── auth
│   ├── user
│   ├── document
│   └── chat
│
├── services
│   ├── pdf.service.ts
│   ├── embedding.service.ts
│   ├── llm.service.ts
│   └── qdrant.service.ts
│
├── repositories
│
├── middlewares
│   ├── auth.middleware.ts
│   ├── validate.middleware.ts
│   └── error.middleware.ts
│
├── config
│   ├── env.config.ts
│   └── qdrant.config.ts
│
├── utils
│   ├── sendResponse.ts
│   ├── asyncHandler.ts
│   └── AppError.ts
│
└── app.ts
```

---

# 🧠 Software Design Principles

## Object-Oriented Service Layer

Each domain is encapsulated within dedicated services.

### Services

* AuthService
* UserService
* DocumentService
* ChatService
* EmbeddingService
* QdrantService
* LLMService

### Benefits

✅ Single Responsibility Principle

✅ Reusable Business Logic

✅ Testable Components

✅ High Scalability

✅ Maintainable Codebase

---

# 🏛️ Clean Architecture Flow

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Controller

Handles:

* HTTP Requests
* Validation
* Response Formatting

### Service

Handles:

* Business Logic
* AI Operations
* Document Processing

### Repository

Handles:

* Database Queries
* CRUD Operations

---

# 📄 Document Processing Pipeline

```text
PDF Upload
     ↓
PDF Parsing
     ↓
Text Extraction
     ↓
Chunk Generation
     ↓
Embedding Creation
     ↓
Store in Qdrant
```

### Stored Metadata

```json
{
  "userId": "user_id",
  "documentId": "document_id",
  "chunkIndex": 0,
  "text": "chunk content"
}
```

---

# 🧬 Retrieval-Augmented Generation (RAG)

The heart of the application.

```text
User Question
       ↓
Generate Query Embedding
       ↓
Qdrant Similarity Search
       ↓
Retrieve Relevant Chunks
       ↓
Build Context
       ↓
Send Context to LLM
       ↓
Generate Final Answer
```

### Advantages

* Reduced Hallucinations
* Accurate Responses
* Source-Grounded Answers
* Fast Retrieval

---

# 🔍 Vector Search Strategy

Each vector includes:

```json
{
  "userId": "...",
  "documentId": "...",
  "chunkIndex": "...",
  "text": "..."
}
```

### Benefits

🔐 Multi-Tenant Security

📄 Document Isolation

⚡ Fast Semantic Retrieval

🧠 High Relevance Search

---

# 💬 Chat System

### Features

* Document-Specific Conversations
* Persistent Chat History
* AI Responses Grounded in Context
* Multi-Session Support

### Chat Flow

```text
Select Document
      ↓
Ask Question
      ↓
Retrieve Context
      ↓
Generate AI Response
      ↓
Store Conversation
```

---

# 🔐 Authentication Flow

```text
Login
   ↓
Generate JWT
   ↓
Store HttpOnly Cookie
   ↓
Middleware Verification
   ↓
Authorized Access
```

### Security Features

* JWT Access Token
* Refresh Token Rotation
* Cookie-Based Sessions
* Protected API Routes

---

# 📡 API Endpoints

## Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/logout
```

## User

```http
GET /users/me
```

## Documents

```http
POST /documents/upload
GET /documents
DELETE /documents/:id
```

## Chat

```http
POST /chats/query
GET /chats/history
```

---

# ⚠️ Error Handling

Centralized error handling strategy using custom error classes.

### AppError

```ts
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}
```

### Standard Response Format

```json
{
  "success": false,
  "message": "Something went wrong",
  "statusCode": 400
}
```

### Covered Scenarios

* Validation Errors
* Authentication Failures
* Database Errors
* Unknown Exceptions

---

# 🎨 Frontend Architecture

```text
Dashboard
│
├── Sidebar
│   └── Document List
│
├── Upload Section
│
└── Chat Interface
```

### Features

* Responsive Design
* Protected Routes
* Session Persistence
* Real-Time Chat Experience

---

# 🔄 User Journey

```text
Register/Login
      ↓
Upload PDF
      ↓
Document Processing
      ↓
Embedding Generation
      ↓
Vector Storage
      ↓
Select Document
      ↓
Ask Questions
      ↓
Receive AI Answers
```

---

# 📈 Scalability Highlights

* Modular Architecture
* Service-Oriented Design
* Qdrant Vector Storage
* Independent AI Layer
* Repository Pattern
* Centralized Error Handling

Built to support:

* Thousands of Documents
* Multi-User Access
* Future Microservice Migration
* Horizontal Scaling

---

# 🚀 Local Development

## Backend

```bash
npm install
npm run dev
```

## Frontend

```bash
npm install
npm run dev
```

---

# 🔮 Future Enhancements

### Planned Features

* ⚡ Streaming AI Responses
* ⚡ Redis Caching
* ⚡ Rate Limiting
* ⚡ WebSocket Chat
* ⚡ Markdown Rendering
* ⚡ Multi-Document Querying
* ⚡ Source Citations
* ⚡ Document Summarization
* ⚡ Team Workspaces

---

# 📊 Project Highlights

✅ Production-Ready Architecture

✅ Retrieval-Augmented Generation (RAG)

✅ Qdrant Vector Database Integration

✅ Secure JWT Authentication

✅ Clean Architecture

✅ OOP-Based Service Layer

✅ Scalable Backend Design

✅ Context-Aware AI Responses

✅ Interview-Ready Project

✅ Portfolio-Grade Implementation

---

# 👨‍💻 Author

**Aryan Yadav**

Full Stack Developer | MERN Stack | AI Systems

GitHub:
https://github.com/aryanxengineer

---

## ⭐ Project Status

### Current State

* ✅ Architecture Completed
* ✅ RAG Pipeline Working
* ✅ Qdrant Integrated
* ✅ Authentication Implemented
* ✅ Frontend Connected
* ✅ Document Chat Functional

### Ready For

* Portfolio Showcase
* Technical Interviews
* Freelance Projects
* Production Deployment

---

> Transforming static PDFs into intelligent AI-powered knowledge systems.
