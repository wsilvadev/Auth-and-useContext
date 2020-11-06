import React, { useContext } from 'react';
import { View, Button } from 'react-native';

import AuthContext from '../../contexts/auth';

const Dashboard = () => {
    const { signed, user, signOut } = useContext(AuthContext);
    console.log(signed);
    console.log(user);
    async function handleSignOut() {
        signOut();
    }
    return (
        <View>
            <Button title="Sign out" onPress={handleSignOut} />
        </View>
    );
};

export default Dashboard;
