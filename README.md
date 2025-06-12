# React + Vite

# AI Learning Platform

An artificial intelligence-based learning platform  
This system allows users to receive explanations, lessons, and personalized answers through an innovative and user-friendly interface.

---

## Technologies Used

### Frontend
- React
- Redux Toolkit
- React Router
- Material-UI (MUI)
- JavaScript (ES6+)
- Vite

### Backend
- ASP.NET Core Web API (assumed based on endpoint names)
- Entity Framework Core (assumed)
- C#

---

## Assumptions

- You have a development environment with Node.js and npm installed.
- There is an active API server (ASP.NET Core) with matching endpoints.
- The frontend contains a `.env` file with the variable `VITE_API_BASE_URL` pointing to the API address.
- The database is configured and connected to the backend server.
- No two-factor authentication or special permissions are required for local development.

---

## Installation and Local Running Instructions

### 1. Frontend Setup

```bash
git clone <repository-url>
cd lerningplatformfront
npm install
```

#### Create a .env File
In the root directory of the project, create a file named `.env` and add the following line:
```
VITE_API_BASE_URL=http://localhost:5282/api
```
(or your API address)

#### Run the Frontend
```bash
npm run dev
```
By default, the system will be available at:  
[http://localhost:5173](http://localhost:5173)

---

### 2. Backend Setup

> **Note:** The following instructions assume usage of ASP.NET Core.

- Open the backend folder in Visual Studio or VS Code.
- Make sure the `appsettings.json` file is configured with the database connection.
- Install dependencies (if needed):
    ```bash
    dotnet restore
    ```
- Run the server:
    ```bash
    dotnet run
    ```
- The default API address is:  
  `http://localhost:5282/api`

---

## Additional Notes

- Make sure both frontend and backend are running simultaneously.
- You can change ports as needed, but update the API address in the `.env` file accordingly.
- If you encounter connection issues, check that no firewall/antivirus is blocking the ports.

---

Good luck!
