import { describe, expect, it } from 'vitest';
import Table from './index';
import { render, screen } from '../../../test/test-utils';

const columns = [
  {
    Header: 'Block',
    accessor: 'number'
  },
  {
    Header: 'Hash',
    accessor: 'hash'
  }
];

const data = [
  { number: 1234, hash: '0x123' },
  { number: 5687, hash: '0x456' }
];

describe('Tests for button', () => {
  it('Table should display the correct amount of headers, data and correct data', async () => {
    render(<Table columns={columns} data={data} showPagination={false} />);

    const headers = await screen.findAllByRole('columnheader');
    expect(headers).toHaveLength(2);

    const tableData = await screen.findAllByRole('cell');
    expect(tableData).toHaveLength(4);

    expect(screen.getByText(/Block/i)).toBeInTheDocument();
    expect(screen.getByText(/Hash/i)).toBeInTheDocument();
    expect(screen.getByText(/1234/i)).toBeInTheDocument();
    expect(screen.getByText(/0x123/i)).toBeInTheDocument();
  });
  it('Table should display the correct amount of buttons and page info', async () => {
    render(<Table columns={columns} data={data} showPagination />);
    expect(screen.getByText(/Page 1 of 1/i)).toBeInTheDocument();
    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
});
