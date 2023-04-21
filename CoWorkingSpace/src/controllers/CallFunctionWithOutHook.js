import {useContext} from 'react';
import {Context as AuthContext} from '../controllers/AuthController';



export function RefreshToken() {
    const {state, getAuth} = useContext(AuthContext);
    console.log('Refresh Token : ', state);
}