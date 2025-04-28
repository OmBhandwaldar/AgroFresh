# 🌾 AgroFresh

AgroFresh is a web application designed to streamline bulk ordering of fresh produce. It serves both buyers and administrators with features for order placement, management, and catalog control.

---

## 🛠 Tech Stack

- **Front-end & Back-end:** Next.js  
- **Styling:** Tailwind CSS, shadcn/ui  
- **ORM:** Prisma  
- **Database:** PostgreSQL (hosted on Neon.tech)  
- **Hosting:** Vercel

---

## ✨ Features

### 🛒 For Buyers
- **Browse Products**
  - View a catalog of vegetables/fruits with name and price.

- **Place Orders**
  - Buyers can submit bulk orders by entering:
    - Item name
    - Quantity
    - Delivery details (name, contact, address)
  - Orders are stored with unique identifiers in the database.

- **Track Orders**
  - View order status updates:
    - `Pending` – Order received.
    - `In Progress` – Order is being prepared.
    - `Delivered` – Order completed.

### 🧑‍💼 For Admins
- **Order Management**
  - View all orders with full delivery and buyer details.
  - Update order statuses from Pending → In Progress → Delivered.

- **Inventory Management**
  - Add, edit, and delete items in the product catalog.
  - No stock quantity logic (infinite availability).

- **Authentication**
  - Admin login system to secure access to management features.


- **Environment Variables**
  - All sensitive config (API keys, database credentials) are managed via `.env`.

---

## 🚀 How to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/OmBhandwaldar/AgroFresh.git
2. **Put the variables in .env**: Load the environment variables in .env file

3. **Install dependencies**
   ```bash
   npm install
4. **Migrate database**
   ```bash
   npx prisma migrate dev --name init
5. **Seed database**
   ```bash
   npx prisma db seed
6. **Generate prisma client**
   ```bash
   npx prisma generate
7. **Run the project**
   ```bash
   npm run dev