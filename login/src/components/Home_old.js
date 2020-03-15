import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Home = () => {
    const { username } = useContext(GlobalContext);
    return (
        <div>
            <h1>HOME of {username}</h1>
        </div>
    )
}
