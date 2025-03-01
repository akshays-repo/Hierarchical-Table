# Hierarchical Table  

## Overview  
The **Hierarchical Table** project is a React-based application that displays structured data in a table format with parent-child relationships. It allows users to dynamically update values, and changes in child rows automatically update the corresponding parent values. The system also calculates and displays variance percentages to track differences between original and updated values.  

This project is built using **React**, **TypeScript**, and **Vite**, with state management handled through **React Context** for efficient data flow.  

---

## How It Works  

### 1. **Hierarchical Data Structure**  
The table follows a **parent-child hierarchy**, where:  
- Parent rows contain aggregated values from their child rows.  
- When a child row is updated, the change is reflected in the parent row dynamically.  

For example:  
| Category | Value | Updated Value | Variance (%) |  
|----------|-------|--------------|--------------|  
| **Electronics** | 1000 | 1100 | +10% |  
| ├── Mobile | 500 | 600 | +20% |  
| ├── Laptop | 500 | 500 | 0% |  

If the "Mobile" row's value is updated, the **Electronics** category's total will adjust accordingly.  

### 2. **Automatic Recalculation Logic**  
When a user updates a value in any row:  
1. The **context state** updates the corresponding row.  
2. If the row has children, the parent’s **total value is recalculated** based on the sum of child values.  
3. The variance percentage (`(Updated - Original) / Original * 100`) is displayed dynamically.  

### 3. **State Management with React Context**  
The project uses a **context provider** (`DataProvider`) to manage the hierarchical table state globally. This avoids prop drilling and ensures efficient updates across the application.  

- **State Stores:** The hierarchical data is stored in React Context.  
- **Provider Component:** Wraps the application and provides access to data.  
- **Consumer Components:** Table and row components consume this context to display and modify data.  

### 4. **Event Handling & Updates**  
- When a user **edits a value**, an `onChange` event updates the **React state** in the context provider.  
- The **parent rows automatically update** whenever a child value is modified.  
- Variance percentage is recalculated **instantly** after every change.  

### 5. **Testing Strategy**  
The project includes **end-to-end (E2E) tests** to verify the functionality of:  
- Context Provider updates.  
- Row component rendering and value updates.  
- Automatic recalculations of parent values.  

We are using **E2E testing** to ensure full functionality and interaction coverage.  

Tests are located in:  
📁 `tests/hierarchical-table.spec.ts`  

Run tests with:  
```sh
npx playwright test
```

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

### **Explanation**  

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