import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Colors from '../Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
const loginImage = require('./../Assets/Images/login.png');
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
// import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  WebBrowser.maybeCompleteAuthSession();

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  //   const { userData, setUserData } = useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '909802177753-1jom9411r0lutrhje1ptkf38jhb71vnk.apps.googleusercontent.com',
    expoClientId:
      '909802177753-4abjvpj153ntga4vd1oanqceat4kaoa5.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type == 'success') {
      setAccessToken(response.authentication.accessToken);

      getUserData();
    }
  }, [response]);

  const getUserData = async () => {
    try {
      const resp = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${response.authentication.accessToken}`,
        },
      });

      const user = await resp.json();
      console.log('user Details', user);
      setUserInfo(user);
      setUserData(user);
      await Services.setUserAuth(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Image source={loginImage} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to CodeBox</Text>
        <Text style={styles.loginText}>Login/SignUp</Text>
        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Ionicons
            style={styles.googleIcon}
            name="logo-google"
            size={24}
            color="white"
          />
          <Text style={styles.signText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  googleIcon: {
    marginRight: 10,
  },
  signText: {
    color: Colors.white,
  },
});
