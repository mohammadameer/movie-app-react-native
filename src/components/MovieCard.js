import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Share, Animated } from 'react-native';

// components
import { MaterialIcons } from '@expo/vector-icons';

// store
import useStore from '../store';

// this card is used to show movie in the home favourites screen

const MovieCard = ({ movie, favourites }) => {
  const { addMovie, deleteMovie } = useStore();
  const opacity = useRef(new Animated.Value(0)).current;

  const isFavourited = favourites.findIndex(({ id }) => id == movie.id) != -1;

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 600,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity }]}>
      {/* title and average */}
      <View style={styles.titleAndAverage}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.average}>{movie.vote_average}</Text>
      </View>
      {/* date */}
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{new Date(movie.release_date).getFullYear()}</Text>
      </View>
      {/* image */}
      <View style={styles.imageContainer}>
        <View style={styles.imageBackgroud}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.image}
          />
        </View>
      </View>
      {/* buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            Share.share({
              title: movie.title,
              message: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
          }}>
          <MaterialIcons name="share" color="gold" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (!isFavourited) {
              addMovie(movie);
            } else {
              deleteMovie(movie);
            }
          }}>
          <MaterialIcons
            name="favorite"
            color={isFavourited ? '#3BB7DB' : 'rgba(0, 0, 0, 0.3)'}
            size={40}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  root: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 130,
    marginTop: 50,
    paddingLeft: 130,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    top: -50,
    left: 20,
  },
  image: {
    resizeMode: 'stretch',
    justifyContent: 'center',
    width: 100,
    height: 160,
    borderRadius: 10,
  },
  imageBackgroud: {
    width: 100,
    height: 160,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleAndAverage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexGrow: 1,
    width: '85%',
  },
  average: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3BB7DB',
  },
  buttons: {
    ...StyleSheet.absoluteFillObject,
    top: '90%',
    left: '122%',
    flexDirection: 'row',
  },
  button: {
    marginRight: 10,
  },
  dateContainer: {},
  date: {
    color: 'grey',
  },
});
