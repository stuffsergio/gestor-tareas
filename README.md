# Gestor de Tareas con IA

Aplicación web fullstack para gestionar tareas personales con asistente conversacional integrado. El usuario puede crear y organizar tareas por prioridad, y consultar o añadir nuevas mediante lenguaje natural a través de un modelo de lenguaje (LLM).

**Frontend:** https://gestor-tareas-amber.vercel.app  
**Backend API:** https://gestor-tareas-production-11f4.up.railway.app

---

## Funcionalidades

- Crear tareas con nivel de prioridad (alta, media, baja)
- Consultar tareas existentes mediante el asistente IA
- Añadir tareas a través del chat en lenguaje natural
- Detección y aviso de tareas duplicadas
- Autenticación de usuarios con token
- API REST para la comunicación frontend–backend

---

## Arquitectura

```
Frontend (Vercel)
       │
       │  HTTP / REST
       ▼
Backend API (Railway)
       │
       ├── Supabase       → Base de datos (usuarios y tareas)
       └── OpenRouter     → Proveedor del modelo de lenguaje (LLM)
```

---

## Stack tecnológico

**Backend**
- Node.js + Express
- Supabase (PostgreSQL gestionado)
- OpenRouter API (acceso a LLM)
- `dotenv`, `cors`

**Frontend**
- JavaScript vanilla
- Vite
- HTML + CSS

**Infraestructura**
- Frontend desplegado en [Vercel](https://vercel.com)
- Backend desplegado en [Railway](https://railway.app)
- Base de datos en [Supabase](https://supabase.com)

---

## Estructura del proyecto

```
backend/
├── src/
│   ├── routes/
│   │   └── ai.js          # Endpoint del asistente IA
│   ├── middleware/
│   │   └── auth.js        # Validación de tokens
│   ├── LLM.js             # Lógica de comunicación con OpenRouter
│   └── index.js           # Punto de entrada del servidor
├── package.json
└── .env
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
PORT=8080
FRONTEND_URL=http://localhost:5173

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key

OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/stuffsergio/gestor-tareas.git
cd gestor-tareas

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crea el archivo .env en la raíz del backend (ver sección anterior)

# 4. Modo desarrollo
npm run dev

# 5. Producción
npm start
```

---

## Flujo del asistente IA

Cuando el usuario envía un mensaje al chat, el backend ejecuta el siguiente flujo:

1. Valida el token del usuario
2. Consulta las tareas actuales del usuario en Supabase
3. Construye un prompt de contexto con esas tareas
4. Envía el contexto junto al mensaje del usuario al LLM vía OpenRouter
5. Devuelve la respuesta al frontend

**Ejemplo de contexto enviado al modelo:**

```
El usuario ya tiene las siguientes tareas registradas:
- Estudiar Node (prioridad: alta)
- Comprar comida (prioridad: media)

Si el usuario quiere añadir una tarea que ya existe, avísale.
Responde siempre en español.
```

---

## Seguridad

- Autenticación basada en tokens en cada petición al backend
- Variables sensibles gestionadas exclusivamente mediante variables de entorno (nunca en el código)
- CORS configurado para aceptar únicamente peticiones desde el frontend autorizado

---

## Posibles mejoras

- CRUD completo de tareas operado desde el chat (editar, eliminar)
- Clasificación automática de prioridad según el contenido de la tarea
- Historial de conversaciones persistente por usuario
- Tests de integración para los endpoints de la API
- Mejoras en la interfaz: drag & drop, filtros, vista de calendario

---

## Licencia

[MIT](LICENSE)

---

## Autor

**Sergio** — [@stuffsergio](https://github.com/stuffsergio)
