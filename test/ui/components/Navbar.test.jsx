import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Tests in <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'Carlos_Tester',
      id: 123
    },
    logout: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show the name of the authenticated user', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Carlos_Tester')).toBeTruthy();
  });

  test('should call the logout and navigate function when user clicks on the logout button', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole('button', { name: 'Logout' });

    fireEvent.click(logoutButton);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
