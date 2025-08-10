import React from "react";
import "./table.scss";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onSelectRow?: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  selectedRows?: Record<string, boolean>;
  showCheckbox?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onSelectRow,
  onSelectAll,
  selectedRows = {},
  showCheckbox = false,
}) => {
  const allSelected =
    data.length > 0 && data.every((row) => selectedRows[row.id]);

  return (
    <div className="table-container">
      <table className="contact-table">
        <thead>
          <tr>
            {showCheckbox && (
              <th aria-label="select-item-head">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} aria-label={`${col.key}-head`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {!data?.length && (
          <tbody style={{ textAlign: "center", height: "65vh" }}>
            <tr>
              <td
                colSpan={columns.length + (showCheckbox ? 1 : 0)}
                className="no-data-cell"
              >
                No Data Found!
              </td>
            </tr>
          </tbody>
        )}

        {!!data?.length && (
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {showCheckbox && (
                  <td aria-label="select-item-cell">
                    <input
                      type="checkbox"
                      checked={!!selectedRows[row.id]}
                      onChange={(e) => onSelectRow?.(row.id, e.target.checked)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} aria-label={`${col.key}-cell`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DataTable;
