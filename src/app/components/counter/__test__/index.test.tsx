import { render } from '@testing-library/react';
import Counter from '..';

describe('Counter', () => {
  it('should diplay the total numbers of YouTube channels', () => {
    const { getByText } = render(<Counter limit={50} total={3000} />);

    const title = getByText('Showing 0 - 50 of 3,000 channels');

    expect(title).toBeVisible;
  });
});
