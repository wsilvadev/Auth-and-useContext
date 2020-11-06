import React, { useContext } from 'react';
import { View, Button } from 'react-native';

import AuthContext from '../../contexts/auth';

const SignIn = () => {
    const { signed, user, signIn } = useContext(AuthContext);

    console.log(signed);
    console.log(user);

    function handleSignIn() {
        signIn();
    }
    return (
        <View>
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};

export default SignIn;
