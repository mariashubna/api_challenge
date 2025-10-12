import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const BASE_URL = process.env.APP_URL || "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Challenge",
      version: "1.0.0",
      description:
        "API for mobile app and admin panel: authentication, challenges, invites, friends, and statistics",
    },
    servers: [
      { url: `${BASE_URL}/api` }, // универсальный префикс для всех роутов
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", example: "user@example.com" },
            name: { type: "string", example: "John Doe" },
            roles: { type: "string", example: "user" },
          },
        },
        AuthRequest: {
          type: "object",
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "123456aA." },
            name: { type: "string", example: "John Doe" },
          },
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "123456aA." },
          },
        },
        AppleLoginRequest: {
          type: "object",
          properties: {
            appleToken: {
              type: "string",
              example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        RefreshRequest: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string" },
            refreshToken: { type: "string" },
            user: { $ref: "#/components/schemas/User" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        Challenge: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Health Marathon" },
            duration: { type: "integer", example: 7 },
            color: { type: "string", example: "#FF0000" },
            isCompleted: { type: "boolean", example: false },
          },
        },
        Invite: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            status: { type: "string", example: "pending" },
            fromUserId: { type: "integer", example: 1 },
            toUserId: { type: "integer", example: 2 },
            challengeId: { type: "integer", example: 1 },
          },
        },
        Friend: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            status: { type: "string", example: "pending" },
            requesterId: { type: "integer", example: 1 },
            receiverId: { type: "integer", example: 2 },
          },
        },
        Stats: {
          type: "object",
          properties: {
            challengeId: { type: "integer", example: 1 },
            name: { type: "string", example: "Health Marathon" },
            totalDays: { type: "integer", example: 7 },
            completedDays: { type: "integer", example: 4 },
            progress: { type: "integer", example: 57 },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Challenges", description: "Challenge management" },
      { name: "Invites", description: "Challenge invites" },
      { name: "Friends", description: "Friend management" },
      { name: "Statistics", description: "Challenge statistics" },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
