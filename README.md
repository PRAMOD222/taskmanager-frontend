# Frontend - Task Management System

## 🧰 Tech Stack Overview

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript / React
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Icons/UI Components:** React-icons, Shadcn/ui
- **API Communication:** Axios

---

## 🛠️ Setup Instructions (Local Development)

1. **Clone the repository**:
    ```bash
    git clone https://github.com/PRAMOD222/taskmanager-frontend.git
    cd taskmanager-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start development server**:
    ```bash
    npm run dev
    ```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and define the following variable:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

Adjust the URL if your backend runs on a different host or port.

---

## 👤 Default Admin Credentials

Use the following credentials to log in as an admin:

```
Email: admin@example.com
Password: Admin@123
```

> Make sure these users exist in your backend or seed data.

---

## 📊 API Endpoints

All API calls are managed in `services/api.js`. Refer to the backend README for complete documentation of the following APIs:

- `/api/users/*`
- `/api/tasks/*`
- `/api/analytics/*`

These are consumed in relevant dashboard sections (admin/manager/employee).

---

## 🔐 Role Permission Matrix

| Feature                       | Admin | Manager | Employee |
|------------------------------|:-----:|:-------:|:--------:|
| Access Dashboard             | ✅    | ✅      | ✅       |
| Manage Users                 | ✅    | ✅      | ❌       |
| Create Tasks                 | ✅    | ✅      | ✅       |
| View All Tasks               | ✅    | ✅      | ❌       |
| View Assigned Tasks          | ✅    | ✅      | ✅       |
| Update Task Status           | ✅    | ✅      | ✅ (own) |
| Assign Task to User          | ✅    | ✅      | ❌       |
| Modify Task Priority         | ✅    | ✅      | ❌       |
| Delete Task                  | ✅    | ✅      | ❌       |
| View Analytics               | ✅    | ❌      | ❌       |

---

## 📁 Folder Structure Overview

```
app/
├── dashboard/
│   ├── admin/       → Admin views
│   ├── manager/     → Manager views
│   └── employee/    → Employee views
├── login/           → Login page
components/          → Shared UI components
hooks/               → Custom hooks
lib/                 → Utility functions
redux/               → Redux Toolkit (store, slices)
services/            → API service layer
```

---

## ✅ Done!

You’re now ready to run the frontend. Make sure the backend is running at the specified API base URL.