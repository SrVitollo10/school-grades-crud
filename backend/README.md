# School Grades Backend API

Backend API desarrollada con Node.js, Express y MongoDB para la gestión de estudiantes y notas escolares.

Este proyecto permite:

- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT
- CRUD completo de estudiantes
- CRUD completo de notas
- Dashboard con estadísticas generales
- Protección de rutas privadas
- Conexión con MongoDB

---

# Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cors
- nodemon

---

# Estructura del proyecto

```txt
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── student.controller.js
│   ├── grade.controller.js
│   └── dashboard.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── student.model.js
│   └── grade.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── student.routes.js
│   ├── grade.routes.js
│   └── dashboard.routes.js
│
└── server.js