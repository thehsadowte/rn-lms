import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const WelcomeHeader = () => {
  const { userData, setUserData } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello</Text>
        <Text style={styles.userName}>{userData?.name}</Text>
      </View>
      <Image source={{ uri: userData?.picture }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default WelcomeHeader;
