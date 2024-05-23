import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ListItem from '..';

describe('ListItem', () => {
  it('should display a YouTube channel', () => {
    const { getByTestId } = render(
      <ListItem
        id="1"
        initials={'John Doe'}
        display_name={'John Doe'}
        handle={'@JohnDoe'}
        subscribers={1788675}
        uploads={909}
        views={92897891}
        color={''}
        updateChannel={() => {}}
        status={''}
        route={null}
      />
    );

    const initials = getByTestId('initials').textContent;
    const displayName = getByTestId('display name').textContent;
    const handle = getByTestId('handle').textContent;
    const subscribers = getByTestId('subscribers').textContent;
    const uploads = getByTestId('uploads').textContent;
    const views = getByTestId('views').textContent;

    expect(initials).toBe('JD');
    expect(displayName).toBe('John Doe');
    expect(handle).toBe('@JohnDoe');
    expect(subscribers).toBe('1.8 M');
    expect(uploads).toBe('909');
    expect(views).toBe('92.9 M');
  });
});
