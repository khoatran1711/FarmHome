import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export const LoginScreen = () => {
  return (
    <View>
      {/** Input username */}
      <View>
        <Text>Username:</Text>
        <TextInput placeholder="Username" />
      </View>

      {/** Input password */}
      <View>
        <Text>Password:</Text>
        <TextInput placeholder="Password" />
      </View>

      {/** Forgot password button */}
      <TouchableOpacity>
        <Text>Forgot password</Text>
      </TouchableOpacity>

      {/** Login button */}
      <View>
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>

      {/** Move to Sign up screen */}
      <View>
        <TouchableOpacity>
          <Text>You dont have an account? Create now?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
