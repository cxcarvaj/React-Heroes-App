import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();
const mockedUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
  useParams: () => ({
    id: 'marvel-iron'
  })
}));

describe('Test in <HeroPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show Iron Man info', () => {
    render(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <HeroPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Iron Man')).toBeTruthy();

    const img = screen.getByRole('img');

    expect(img.src).toContain('/assets/heroes/marvel-iron.jpg');
  });

  test('should go back when click on the Return button', () => {
    render(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <HeroPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
