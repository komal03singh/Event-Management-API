#  Event Management API

A robust RESTful API built with Node.js, Express, and Prisma ORM for managing events and user registrations. This API allows users to create and view events, as well as register or cancel participation in events.

---

## 🚀 Features

- Create events  
- Register users for events  
- View all upcoming or past events  
- Capacity management for events 

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express  
- **ORM**: Prisma  
- **Database**: PostgreSQL  
- **Validation**: Zod  
- **Dev Tools**: Nodemon, dotenv


## 🧩 Folder Structure

```
Event-Management-API/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/ (Prisma schema)
│   ├── routes/
│   ├── utils/
│   └── index.js
├── .env
├── prisma/
│   ├── schema.prisma
├── package.json
└── README.md
```

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
   git clone https://github.com/komal03singh/Event-Management-API.git
   cd Event-Management-API
````

2. **Install dependencies**

   ```bash
   npm install dotenv express nodemon zod prisma @prisma/client 
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:

   ```
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/event_db?schema=public
   PORT=<enter desired port>
   ```

4. **Prisma migration and generation**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the server**

   ```bash
   npm run dev
   ```

---

## 📘 API Endpoints

### 🔹 Events

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/events/getEvent`     | Get all events           |
| GET    | `/api/events/upcomingEvents` | Get upcoming events  |
| POST   | `/api/events/createEvent`     | Create a new event       |
| GET | `/api/events/eventStats/:id` | Get an event Statistics          |

### 🔹 Event Registration

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | `/api/eventRegistration/registerForEvent/:eventId` | Register for an event |
| DELETE | `/api/eventRegistration/cancelRegistration/:id`   | Cancel registration   |

---

## 🔁 Example API Requests & Responses

### ✅ Create an Event

**Request:**

```http
POST /api/event/createEvent
Content-Type: application/json

{
  "eventTitle": "React Bootcamp",
  "eventDate": "2025-07-20",
  "eventLocation": "Online",
  "eventCapacity": 100
}
```

**Response:**

```json
{
    "StatusCode": 201,
    "data": "Event Created Successfully!",
    "message": {
        "id": 4
    },
    "success": true
}
```

---

### ✅ Register for Event

**Request:**

```http
POST /api/eventRegistration/registerForEvent/2
Content-Type: application/json

{
  "name": "komal Singh",
  "email": "komalsinghh@example.com"
}
```

**Response:**

```json
{
    "StatusCode": 201,
    "data": "User Registered Sucessfully!",
    "message": {
        "id": 7,
        "name": "komal Singh",
        "email": "komalsinghh@example.com",
        "eventId": 2
    },
    "success": true
}
```

---

### ❌ Cancel Registration

**Request:**

```http
DELETE /api/eventRegistration/cancelRegistration/7
```

**Response:**

```json
{
    "StatusCode": 200,
    "data": "User Registration Deleted Successfully!",
    "success": true
}
```
**👤 Author**
```
## 👩‍💻 Author
- Komal
- [GitHub Profile](https://github.com/komal03singh)


