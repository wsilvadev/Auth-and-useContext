import React, { useContext } from 'react';

import AuthContext from '../contexts/auth';

import AuthRoute from './auth';
import AppRoute from './app';
import { View, ActivityIndicator } from 'react-native';

const Routes = () => {
    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#999" />
            </View>
        );
    }

    return signed ? <AppRoute /> : <AuthRoute />;
};

export default Routes;
