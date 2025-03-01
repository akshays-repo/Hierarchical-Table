# Hierarchical Table Application

This application demonstrates an interactive hierarchical table with dynamic allocation features. Users can update values in the table either by percentage increase or by setting direct values, and the application automatically updates all relevant subtotals.

## Features

- Hierarchical data display with parent-child relationships
- Percentage-based allocation to increase row values
- Direct value allocation to set specific values
- Automatic calculation of subtotals when child values change
- Proportional distribution of parent values to children
- Variance percentage calculation against original values
- Grand total calculation with variance display

## Technology Stack

- React 18 for the UI framework
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development and building

## Project Structure

```
src/
├── components/
│   ├── HierarchicalTable.tsx - Main table component
│   └── TableRow.tsx - Component for individual rows
├── types.ts - TypeScript interface definitions
├── utils.ts - Utility functions for data manipulation
├── App.tsx - Main application component
└── index.tsx - Application entry point
```

## Data Model

The data is structured as a hierarchical model with parent-child relationships. Each data row has:

- `id`: Unique identifier for the row
- `label`: Display name for the row
- `value`: Current value of the row (can be updated)
- `originalValue`: Initial value of the row (used for variance calculation)
- `children`: Optional array of child rows with the same structure

## Implementation Details

### Value Update Logic

1. **Leaf Node Updates**:
   - When updating a leaf node (a row without children), the value is directly changed.

2. **Parent Node Updates**:
   - When updating a parent node (a row with children), the value change is proportionally distributed to all children based on their contribution to the total.

3. **Value Rollup**:
   - After any child node is updated, all parent nodes in the hierarchy are recalculated by summing their children.

### Variance Calculation

The variance is calculated as a percentage difference between the current value and the original value:
```
variance = (currentValue - originalValue) / originalValue * 100
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view the application

## Building for Production

```
npm run build
```

This command will create an optimized build in the `dist` folder that can be deployed to any static hosting service.