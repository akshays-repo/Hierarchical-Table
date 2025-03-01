import { ChangeEvent, FC, useState } from 'react';
import { DataRow } from '../../types/hierarchical-table.type';
import { useHierarchicalDataContext } from '../../context/hierarchical-table.context';
import Input from '../../components/input';
import Button from '../../components/button';


interface TableRowProps {
    row: DataRow;
    level: number;
    parentPath: string[];
}

const TableRow: FC<TableRowProps> = ({ row, level, parentPath }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const { updateRow } = useHierarchicalDataContext();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAllocationPercentage = () => {
        if (!inputValue) return;

        const percentage = parseFloat(inputValue);
        if (isNaN(percentage)) return;

        const increaseAmount = row.value * (percentage / 100);
        const newValue = row.value + increaseAmount;

        updateRow(row.id, newValue, parentPath);
        setInputValue('');
    };

    const handleAllocationValue = () => {
        if (!inputValue) return;

        const newValue = parseFloat(inputValue);
        if (isNaN(newValue)) return;

        updateRow(row.id, newValue, parentPath);
        setInputValue('');
    };

    // Calculate variance percentage
    const variancePercentage = ((row.value - row.originalValue) / row.originalValue) * 100;

    const currentPath = [...parentPath, row.id];

    return (
        <>
            <tr className={level % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-3 px-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <span className="ml-2" style={{ marginLeft: `${level * 20}px` }}>
                            {level > 0 && "-- "}
                            {row.label}
                        </span>
                    </div>
                </td>
                <td className="py-3 px-4 border-t border-gray-200">
                    {row.value.toFixed(2)}
                </td>
                <td className="py-3 px-4 border-t border-gray-200">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter value"
                        name={row.label}
                    />
                </td>
                <td className="py-3 px-4 border-t border-gray-200">
                    <Button
                        variant='primary'
                        onClick={handleAllocationPercentage}
                        id={`${row.label}-allocation-percentage`}

                    >
                        Allocation %
                    </Button>
                </td>
                <td className="py-3 px-4 border-t border-gray-200">
                    <Button
                        variant='secondary'
                        onClick={handleAllocationValue}
                        id={`${row.label}-allocation-value`}

                    >
                        Allocation Val
                    </Button>
                </td>
                <td className="py-3 px-4 border-t border-gray-200">
                    {variancePercentage.toFixed(2)}%
                </td>
            </tr>
            {row.children && row.children.map(child => (
                <TableRow
                    key={child.id}
                    row={child}
                    level={level + 1}
                    parentPath={currentPath}
                />
            ))}
        </>
    );
};

export default TableRow;