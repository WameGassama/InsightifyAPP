import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ListItem from '..';
import LoadMore from '..';
import userEvent from '@testing-library/user-event';

describe('LoadMore', () => {
  it('should call the load more function', async () => {
    userEvent.setup();

    const loadMore = jest.fn();

    const { getByRole } = render(<LoadMore onClick={loadMore} isFetching />);

    const button = getByRole('button');

    await userEvent.click(button);

    expect(loadMore).toHaveBeenCalledTimes(1);
  });
});
