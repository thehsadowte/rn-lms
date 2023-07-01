import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';

const Home = () => {
  const { userData, setUserData } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <WelcomeHeader />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});
