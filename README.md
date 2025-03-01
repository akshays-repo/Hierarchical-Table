# Hierarchical Table

[Live Demo](https://hierarchical-table-mauve.vercel.app/)

## Overview  
The **Hierarchical Table** project is a **React-based** application that displays structured data in a table format with **parent-child relationships**. It allows users to dynamically update values, and changes in child rows automatically update the corresponding parent values. Additionally, the system calculates and displays **variance percentages** to track differences between the original and updated values.

This project is built using **React**, **TypeScript**, and **Vite**, with **state management handled through React Context** for efficient data flow.

---

## Features  
- **Hierarchical Data Structure**: Supports parent-child relationships in tabular format.
- **Automatic Parent Updates**: Changes in child rows update the parent row dynamically.
- **Variance Calculation**: Displays variance percentage based on the original and updated values.
- **State Management with React Context**: Centralized state management without prop drilling.
- **Optimized Performance**: Efficient updates using React Context and state optimizations.
- **End-to-End (E2E) Testing**: Fully tested with **Playwright**.

---

## How It Works  

### 1. **Hierarchical Data Structure**  
The table follows a **parent-child hierarchy**, where:
- **Parent rows** contain aggregated values from their child rows.
- When a **child row** is updated, the change is reflected in the parent row dynamically.

#### **Example:**

| Category      | Value | Updated Value | Variance (%) |
|--------------|-------|--------------|--------------|
| **Electronics** | 1000  | 1100  | +10% |
| ├── Mobile   | 500   | 600   | +20% |
| ├── Laptop   | 500   | 500   | 0%  |

If the "Mobile" row's value is updated, the **Electronics** category's total will adjust accordingly.

### 2. **Automatic Recalculation Logic**  
When a user updates a value in any row:
1. The **React Context state** updates the corresponding row.
2. If the row has children, the **parent’s total value is recalculated** based on the sum of child values.
3. The variance percentage is dynamically calculated using:
   
   ```ts
   Variance (%) = ((Updated Value - Original Value) / Original Value) * 100
   ```

### 3. **State Management with React Context**  
The project uses a **context provider (`DataProvider`)** to manage the hierarchical table state globally.
- **Avoids prop drilling** and ensures efficient updates.
- **Provider Component** wraps the application to provide access to data.
- **Consumer Components** (table and row components) consume the context to display and modify data.

### 4. **Event Handling & Updates**  
- When a user **edits a value**, an `onChange` event updates the **React state** in the context provider.
- The **parent rows automatically update** whenever a child value is modified.
- Variance percentage is recalculated **instantly** after every change.

---

## **Developer Guide**  

### **Installation & Running the Project**  
#### **1. Clone the Repository:**  
```sh
git clone https://github.com/akshays-repo/Hierarchical-Table
cd Hierarchical-Table
```

#### **2. Install Dependencies:**  
```sh
npm install
```

#### **3. Start the Development Server:**  
```sh
npm run dev
```
This will start the application on `http://localhost:5173/`.

### **Testing**  
The project includes **End-to-End (E2E) tests** using Playwright.

#### **Run Playwright Tests:**  
```sh
npx playwright test
```

#### **Test Location:**  
📁 `tests/hierarchical-table.spec.ts`

[test-report.pdf](https://github.com/user-attachments/files/19039096/test.pdf)
---

## **Folder Structure**  

```
📦 src
 ┣ 📂 components
 ┃ ┣ 📜 button.tsx
 ┃ ┗ 📜 input.tsx
 ┣ 📂 constants
 ┃ ┗ 📜 hierarchical-table.constant.ts
 ┣ 📂 context
 ┃ ┗ 📜 hierarchical-table.context.tsx
 ┣ 📂 features
 ┃ ┣ 📂 hierarchical-table
 ┃ ┃ ┣ 📜 hierarchical-table.tsx
 ┃ ┃ ┗ 📜 table-row.tsx
 ┃ ┗ 📜 readme.md
 ┣ 📂 types
 ┃ ┗ 📜 hierarchical-table.type.ts
 ┣ 📜 App.tsx
 ┣ 📜 index.css
 ┣ 📜 main.tsx
 ┗ 📜 vite-env.d.ts
```

### **Folder Explanation**  
#### **1. `components/` - Reusable UI Components**  
- **`button.tsx`** → Button component for interactions (expand/collapse rows).  
- **`input.tsx`** → Input field to edit values in table rows.  

#### **2. `constants/` - Static Data**  
- **`hierarchical-table.constant.ts`** → Stores default hierarchical data and configurations.  

#### **3. `context/` - Global State Management**  
- **`hierarchical-table.context.tsx`** → Manages hierarchical table state using **React Context API**.  

#### **4. `features/hierarchical-table/` - Core Table Components**  
- **`hierarchical-table.tsx`** → Main component that renders the entire hierarchical table.  
- **`table-row.tsx`** → Renders individual rows and updates parent values dynamically.  

#### **5. `types/` - TypeScript Type Definitions**  
- **`hierarchical-table.type.ts`** → Defines types/interfaces for hierarchical table data.  

#### **6. Root Files**  
- **`App.tsx`** → Renders the application and wraps it with the context provider.  
- **`main.tsx`** → React entry point using Vite.  
- **`index.css`** → Global styles.

---

## **GitHub Actions Workflow**  
This project uses **GitHub Actions** for CI/CD automation, with Playwright testing.

### **Workflow File Location:**  
📁 **`.github/workflows/playwright.yml`**

### **Workflow Overview:**  
- Runs **Playwright tests** on every `push` and `pull request`.
- Ensures that new changes do not break functionality.

This ensures automated testing on GitHub whenever changes are pushed or PRs are created.

---

## **License**  
This project is licensed under the **MIT License**.

