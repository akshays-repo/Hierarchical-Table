import HierarchicalTable from "./features/hierarchical-table/hierarchical-table";
import { DataProvider } from "./context/hierarchical-table.context";

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Hierarchical Table</h1>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <HierarchicalTable />
          </div>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;