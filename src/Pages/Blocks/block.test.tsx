import { describe, expect, it } from 'vitest';
import Blocks from './index';
import { render, screen } from '../../test/test-utils';

describe('Blocks test', () => {
  it('Display loading on mount', () => {
    render(<Blocks />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('Display title and table after finished loading', async () => {
    /** Should be mocking useGetLatestBlocks here results */
    render(<Blocks />);
    await new Promise((r) => setTimeout(r, 4000));
    const test = screen.getByText(/Blocks/i);

    const table = await screen.findAllByRole('table');
    expect(test).toBeInTheDocument();
    expect(table).toHaveLength(1);
  });
});
