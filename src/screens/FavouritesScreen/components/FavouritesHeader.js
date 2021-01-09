import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FavouritesHeader = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Favourites</Text>
    </View>
  );
};

export default FavouritesHeader;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 40,
  },
});
