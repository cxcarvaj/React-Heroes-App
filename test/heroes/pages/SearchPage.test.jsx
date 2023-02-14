import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';


describe('Test in <SearchPage />', () => {

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
        
        screen.debug();

    });

});