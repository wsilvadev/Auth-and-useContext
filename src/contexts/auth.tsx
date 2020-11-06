import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';

interface AuthProps {
    signed: Boolean;
    user: object | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            // just wait 2 seconds to see the loading
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (storageUser && storageToken) {
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
        }
        loadStorageData();
    }, []);

    async function signIn() {
        const response = await auth.signIn();
        setUser(response.user);
        await AsyncStorage.setItem(
            '@RNAuth:user',
            JSON.stringify(response.user)
        );
        await AsyncStorage.setItem('@RNAuth:token', response.token);
    }
    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }
    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, signIn, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
