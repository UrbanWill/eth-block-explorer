import { describe, expect, it, vi } from 'vitest';
import Button from './index';
import { render, screen, userEvent } from '../../../test/test-utils';

describe('Tests for button', () => {
  it('Button label should be displayed', () => {
    render(<Button label="test button label" onHandleClick={() => {}} />);
    expect(screen.getByText(/test button label/i)).toBeInTheDocument();
  });
  it('Button click event should call function once', () => {
    const handleClick = vi.fn();
    render(<Button label="test button label" onHandleClick={handleClick} />);
    userEvent.click(screen.getByRole('button'));
    expect(handleClick.mock.calls.length).toBe(1);
  });
  it('Button click event should NOT call function when button is disabled', () => {
    const handleClick = vi.fn();
    render(<Button label="test button label" onHandleClick={handleClick} isDisabled />);
    userEvent.click(screen.getByRole('button'));
    expect(handleClick.mock.calls.length).toBe(0);
  });
});
