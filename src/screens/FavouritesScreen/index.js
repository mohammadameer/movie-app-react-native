import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

// services
// import { getMovies } from './services';

// components
import MovieCard from '../../components/MovieCard';
import MoviesHeader from './components/FavouritesHeader';
import useStore from '../../store';

const FavouritesScreen = () => {
  const { favourites } = useStore();
  console.log('favourites', favourites);
  return (
    <View style={styles.root}>
      {/*  header */}
      <MoviesHeader />
      {/*  list */}
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={({ item }) => <MovieCard movie={item} favourites={favourites} />}
        />
      ) : (
        <View style={styles.noFavouritesContainer}>
          <Text style={styles.noFavourites}>your favourites will appear hear</Text>
        </View>
      )}
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noFavouritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavourites: {
    color: 'grey',
  },
});
