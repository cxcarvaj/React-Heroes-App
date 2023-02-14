import { authReducer, types } from '../../../src/auth';


describe('Tests in authReducer', () => {

    test('should return default state', () => {

        const state = authReducer({logged: false}, {});
        expect(state).toEqual({ logged: false });

    });

    test('should authenticate and set the user name into the state', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Carlos',
                id: 123,
            }
        };

        const state = authReducer({logged: false}, action);

        expect(state).toEqual({ logged: true, user: action.payload });

    });

    test('should delete the user name and set logged in false', () => {
        
        const state = {
            logged: true,
            user: {name: 'Carlos', id: 123},
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(state, action);

        expect(newState).toEqual({ logged: false });

    });


});