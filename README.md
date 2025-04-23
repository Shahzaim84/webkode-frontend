## 💻 Frontend (React)

### 🔹 Installation
```bash
npm install
```

### 🔹 Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_BACKEND_URL=http://localhost:5000/api
VITE_BACKEND_URL2=http://localhost:5000
```

### 🔹 Start Frontend
```bash
npm run dev
```

### 🔹 Routes Overview

- `/` → Home
- `/register` → Registration Form
- `/otpverification` → OTP Verification
- `/forgotpassword` → Forgot Password
- `/changepassword` → Change Password
- `/login` → Login Form
- `/pricing` → Subscription Plans
- `/dashboard` → View Dashboard
- `/dashboard/balance` → View Balance
- `/dashboard/transfer` → Transfer Funds
- `/dashboard/transactions` → View Transactions
- `/dashboard/invoice` → Generate Invoice
- `/dashboard/admin` → View Admin Dashboard
- `/success` → Success Payment
- `/cancel` → Cancel Payment

---

# 📊 Dashboard Features

✅ **Balance:** View mock balance
✅ **Transfer:** Move funds between users
✅ **Transactions:** Paginated transfer history
✅ **Invoice:** Generate summary by date range (PDF support)

---

# 🔐 Environment Variables Summary

## Backend (`server/.env`)
```env
MONGOOSE_URL
JWT_KEY
PORT
USER
USER_PASS
STRIPE_SECRET_KEY
BASIC_PRICE_ID
STANDARD_PRICE_ID
PREMIUM_PRICE_ID
FRONTEND_URL
```

## Frontend (`client/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000/api
```

---

