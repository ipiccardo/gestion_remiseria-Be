# Gestión de Remisería

Este proyecto consiste en una aplicación web para gestionar una remisería. Utiliza tecnologías como React, Next.js, Node.js, Express, PostgreSQL, Tailwind CSS y Shadcn UI.

## Instalación

1. **Clonar el repositorio del frontend:**

   ```bash
   git clone https://github.com/ipiccardo/gestion_remiseria-Fe.git
   cd gestion_remiseria-Fe
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Clonar el repositorio del backend:**

   ```bash
   git clone https://github.com/ipiccardo/gestion_remiseria-Be.git
   cd gestion_remiseria-Be
   ```

4. **Instalar dependencias:**
   ```bash
   npm install
   ```

## Configuración

1. **Base de datos:**

   - Ejecuta el script `postgres.sql` en tu base de datos PostgreSQL para crear la estructura inicial de la base de datos.
   - En el archivo `.env` del backend, configura la URL de conexión a la base de datos PostgreSQL (`DATABASE_URL`).
   - Asegúrate de que el puerto de tu base de datos PostgreSQL coincida con el especificado en el `.env` del backend.

2. **Variables de entorno:**
   - En el archivo `.env` del frontend, establece la URL del backend (`NEXT_PUBLIC_BACK_END_PORT`).
   - En el archivo `.env` del backend, especifica el puerto en el que se ejecutará el servidor (`PORT`).

## Uso

1. **Iniciar el backend:**

   ```bash
   npm start
   ```

2. **Iniciar el frontend:**

   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   - Abre tu navegador web y ve a la dirección especificada en la terminal después de iniciar el frontend.

## Tecnologías Utilizadas

- React
- Next.js
- Node.js
- Express
- PostgreSQL
- Tailwind CSS
- Shadcn UI
