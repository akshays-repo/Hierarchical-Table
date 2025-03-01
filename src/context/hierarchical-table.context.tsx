import React, { createContext, useContext, useState } from 'react';
import { DataRow } from '../types/hierarchical-table.type';
import { hierarchicalTableInitialData } from '../constants/hierarchical-table.constant';

interface DataContextType {
  data: DataRow[];
  updateRow: (id: string, newValue: number, parentPath?: string[]) => void;
  calculateTotalValue: () => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useHierarchicalDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useHierarchicalDataContext must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataRow[]>(hierarchicalTableInitialData);

  const updateNestedRow = (
    currentData: DataRow[],
    id: string,
    newValue: number,
    parentPath: string[]
  ): DataRow[] => {
    const result = [...currentData];

    // Navigate through the parent path
    let current = result;
    let currentNode: DataRow | undefined;

    for (let i = 0; i < parentPath.length; i++) {
      const parentId = parentPath[i];
      const parentIndex = current.findIndex(item => item.id === parentId);

      if (parentIndex === -1) return result;

      currentNode = current[parentIndex];
      if (!currentNode.children) return result;

      current = currentNode.children;
    }

    // Find the target row
    const rowIndex = current.findIndex(row => row.id === id);
    if (rowIndex === -1) return result;

    const row = current[rowIndex];

    if (row.children && row.children.length > 0) {
      // If this is a parent row with children, distribute the change proportionally
      const totalChildValue = row.children.reduce((sum, child) => sum + child.value, 0);
      const ratio = newValue / totalChildValue;

      row.children = row.children.map(child => ({
        ...child,
        value: parseFloat((child.value * ratio).toFixed(4))
      }));

      row.value = row.children.reduce((sum, child) => sum + child.value, 0);
    } else {
      // If this is a leaf node, just update its value
      row.value = newValue;
    }

    // Update all parent nodes in the path
    updateParentValues(result, parentPath);

    return result;
  };

  const updateParentValues = (data: DataRow[], parentPath: string[]) => {
    if (parentPath.length === 0) return;

    for (let depth = parentPath.length - 1; depth >= 0; depth--) {
      const pathSlice = parentPath.slice(0, depth);
      const currentId = parentPath[depth];

      let currentData = data;
      let parentNode: DataRow | undefined;

      // Navigate to the parent node
      for (const pathId of pathSlice) {
        const index = currentData.findIndex(item => item.id === pathId);
        if (index === -1) return;

        parentNode = currentData[index];
        if (!parentNode.children) return;

        currentData = parentNode.children;
      }

      // Find the current node and update its value based on children
      const currentIndex = currentData.findIndex(item => item.id === currentId);
      if (currentIndex === -1) return;

      const currentNode = currentData[currentIndex];
      if (!currentNode.children) return;

      // Update the node's value to be the sum of its children
      currentNode.value = currentNode.children.reduce(
        (sum, child) => sum + child.value,
        0
      );
    }
  };

  const updateRow = (id: string, newValue: number, parentPath: string[] = []) => {
    setData(prevData => {
      const newData = [...prevData];

      if (parentPath.length > 0) {
        // Update a nested row
        return updateNestedRow(newData, id, newValue, parentPath);
      } else {
        // Update a top-level row
        const rowIndex = newData.findIndex(row => row.id === id);
        if (rowIndex !== -1) {
          const row = newData[rowIndex];

          if (row.children && row.children.length > 0) {
            // If this is a parent row with children, distribute the change proportionally
            const totalChildValue = row.children.reduce((sum, child) => sum + child.value, 0);
            const ratio = newValue / totalChildValue;

            row.children = row.children.map(child => ({
              ...child,
              value: parseFloat((child.value * ratio).toFixed(4))
            }));

            row.value = row.children.reduce((sum, child) => sum + child.value, 0);
          } else {
            // If this is a leaf node, just update its value
            row.value = newValue;
          }
        }
        return newData;
      }
    });
  };

  const calculateTotalValue = (): number => {
    return data.reduce((total, row) => total + row.value, 0);
  };

  return (
    <DataContext.Provider value={{ data, updateRow, calculateTotalValue }}>
      {children}
    </DataContext.Provider>
  );
};