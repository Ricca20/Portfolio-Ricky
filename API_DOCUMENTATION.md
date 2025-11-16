npm run dev# API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-api.render.com/api
```

## Authentication

Current implementation has no authentication. Admin routes should be protected in production.

## Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Endpoints

### Health Check

#### Get Server Status
```
GET /health
```

**Response:**
```json
{
  "status": "Server is running"
}
```

---

## Projects

### Get All Projects

```
GET /projects
```

**Query Parameters:**
- `featured` (boolean, optional): Filter featured projects only

**Example:**
```
GET /projects?featured=true
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-commerce Platform",
      "description": "Full-stack e-commerce solution",
      "image": "https://example.com/image.jpg",
      "techStack": ["React", "Node.js", "MongoDB"],
      "githubUrl": "https://github.com/user/repo",
      "liveUrl": "https://ecommerce-demo.com",
      "featured": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Single Project

```
GET /projects/:id
```

**Parameters:**
- `id` (string, required): Project MongoDB ID

**Example:**
```
GET /projects/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-commerce Platform",
    "description": "Full-stack e-commerce solution",
    "image": "https://example.com/image.jpg",
    "techStack": ["React", "Node.js", "MongoDB"],
    "githubUrl": "https://github.com/user/repo",
    "liveUrl": "https://ecommerce-demo.com",
    "featured": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

### Create Project

```
POST /projects
```

**Request Body:**
```json
{
  "title": "Project Title",
  "description": "Project description",
  "image": "https://example.com/image.jpg",
  "techStack": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/user/repo",
  "liveUrl": "https://project-demo.com",
  "featured": true
}
```

**Validation Rules:**
- `title`: Required, max 100 characters
- `description`: Required, max 1000 characters
- `image`: Required, valid URL
- `techStack`: Required, array with at least 1 item
- `githubUrl`: Required, valid URL
- `liveUrl`: Optional, valid URL
- `featured`: Optional, boolean (default: false)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Project Title",
    ...
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "title: Title is required, techStack: Tech stack must have at least one technology"
}
```

---

### Update Project

```
PUT /projects/:id
```

**Parameters:**
- `id` (string, required): Project MongoDB ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

**Note:** Only include fields you want to update

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": { ... }
}
```

---

### Delete Project

```
DELETE /projects/:id
```

**Parameters:**
- `id` (string, required): Project MongoDB ID

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Messages

### Send Contact Message

```
POST /messages
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss your services..."
}
```

**Validation Rules:**
- `name`: Required, max 50 characters
- `email`: Required, valid email format
- `subject`: Required, max 100 characters
- `message`: Required, max 2000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss your services...",
    "read": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "email: Please provide a valid email"
}
```

---

### Get All Messages (Admin)

```
GET /messages
```

**Query Parameters:**
- `read` (boolean, optional): Filter by read status

**Example:**
```
GET /messages?read=false
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I would like to discuss your services...",
      "read": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Single Message (Admin)

```
GET /messages/:id
```

**Note:** Automatically marks message as read

**Parameters:**
- `id` (string, required): Message MongoDB ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    ...
    "read": true
  }
}
```

---

### Mark Message as Read (Admin)

```
PATCH /messages/:id/read
```

**Parameters:**
- `id` (string, required): Message MongoDB ID

**Response:**
```json
{
  "success": true,
  "message": "Message marked as read",
  "data": { ... }
}
```

---

### Delete Message (Admin)

```
DELETE /messages/:id
```

**Parameters:**
- `id` (string, required): Message MongoDB ID

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## Error Codes

| Code | Status | Message |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## cURL Examples

### Get All Projects
```bash
curl -X GET http://localhost:5000/api/projects
```

### Get Featured Projects
```bash
curl -X GET "http://localhost:5000/api/projects?featured=true"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "image": "https://example.com/image.jpg",
    "techStack": ["React", "Node.js"],
    "githubUrl": "https://github.com/user/repo",
    "featured": true
  }'
```

### Send Message
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in your services"
  }'
```

### Get All Messages
```bash
curl -X GET http://localhost:5000/api/messages
```

### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439011
```

---

## Rate Limiting

Currently not implemented. Add rate limiting in production using:
- `express-rate-limit` package
- Configure limits per endpoint
- Return 429 status code when exceeded

## Security Recommendations

1. **Add Authentication**: Implement JWT for admin routes
2. **Add Authorization**: Verify user permissions
3. **Add Rate Limiting**: Prevent abuse
4. **Validate Input**: Already implemented with Mongoose schemas
5. **Use HTTPS**: Required in production
6. **Add CORS properly**: Restrict to your frontend domain
7. **Environment Variables**: Never expose secrets

---

## Testing the API

Use Postman, Insomnia, or cURL to test endpoints:

1. Start backend: `npm run dev`
2. Test health endpoint
3. Create a project
4. Send a message
5. Verify in MongoDB

---

Last Updated: November 2024
