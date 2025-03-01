import { useHierarchicalDataContext } from '../../context/hierarchical-table.context';
import TableRow from './table-row';

const HierarchicalTable: React.FC = () => {
    const { data, calculateTotalValue } = useHierarchicalDataContext();

    const totalValue = calculateTotalValue();
    const originalTotalValue = data.reduce((sum, row) => sum + row.originalValue, 0);
    const totalVariance = (totalValue - originalTotalValue) / originalTotalValue * 100;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-700">Label</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-700">Value</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-700">Input</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-700">Allocation %</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-700">Allocation Val</th>
                        <th className="py-3 px-4 font-semibold text-sm text-gray-700">Variance %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <TableRow
                            key={row.id}
                            row={row}
                            level={0}
                            parentPath={[]}
                        />
                    ))}
                    <tr className="bg-gray-50 font-bold">
                        <td className="py-3 px-4 text-gray-800">Grand Total</td>
                        <td className="py-3 px-4 text-gray-800">{totalValue.toFixed(2)}</td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4 text-gray-800">
                            {totalVariance.toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HierarchicalTable;