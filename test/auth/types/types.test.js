import { types } from '../../../src/auth';

describe('Tests in types', () => {

    test('should match the types', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });

    });


});