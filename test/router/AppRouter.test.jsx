import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Tests in <AppRouter />', () => {

    test('should show the login if is not authenticated', () => {

        const contextValue = {
            logged: false,
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThan(0);

    });

    test('should show the marvel page if is authenticated', () => {


        const contextValue = {
            logged: true,
            user: {
                name: 'Carlos_Tester',
                id: 123,
            },
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Marvel Comics')).toBeTruthy();
    });


});