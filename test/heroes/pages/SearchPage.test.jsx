import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: () => mockedUseNavigate,
}));


describe('Test in <SearchPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show correctly with default values', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();

    });

    test('should show Batman information and the input with the value of the queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');

        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');

        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const alertSearchHero = screen.getByLabelText('alert-search-hero');

        const alertNoHero = screen.getByLabelText('alert-no-hero');


        expect( alertSearchHero.style.display ).toBe('none');
        expect( alertNoHero.style.display ).toBe('none');

    });

    test('should show an error if the hero does not exist', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alertNoHero = screen.getByLabelText('alert-no-hero');

        expect( alertNoHero.style.display ).not.toBe('none');

    });

    test('should call the push of history', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        
        fireEvent.change( input, { target: { name: 'searchText', value: 'flash' } } );

        const form = screen.getByRole('form');

        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=flash');

    });

});