import { FC } from 'react';
import { useTable, usePagination, Column } from 'react-table';
import Button from '../Button';

import './table.css';

interface Props {
  columns: Array<Column<object>>;
  data: Array<object>;
  showPagination: boolean;
}

const Table: FC<Props> = ({ columns, data, showPagination }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  return (
    <>
      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="pagination">
          <Button label="<<" onHandleClick={() => gotoPage(0)} isDisabled={!canPreviousPage} />
          <Button label="<" onHandleClick={() => previousPage()} isDisabled={!canPreviousPage} />
          <span className="pagination-label">{`Page ${pageIndex + 1} of ${pageOptions.length}`}</span>
          <Button label=">" onHandleClick={() => nextPage()} isDisabled={!canNextPage} />
          <Button label=">>" onHandleClick={() => gotoPage(pageCount - 1)} isDisabled={!canNextPage} />
        </div>
      )}
    </>
  );
};

export default Table;
