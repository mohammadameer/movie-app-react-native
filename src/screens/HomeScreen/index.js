import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

// services
import { getMovies, searchMovies } from './services';

// components
import MovieCard from '../../components/MovieCard';
import MoviesHeader from './components/MoviesHeader';

// store
import useStore from '../../store';
import useDebounce from '../../utils/useDebouncer';

const HomeScreen = () => {
  const { favourites } = useStore();

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const debounced = useDebounce(search, 500);

  useEffect(() => {
    if (search == '') {
      const getData = async () => {
        setLoading(true);
        const result = await getMovies();
        setLoading(false);
        if (result) {
          setMovies(result.results);
        }
      };
      getData();
    }
  }, [search]);

  useEffect(() => {
    if (search !== '') {
      const getData = async () => {
        setLoading(true);
        const result = await searchMovies({ search });
        setLoading(false);
        if (result) setMovies(result.results);
      };
      getData();
    }
  }, [debounced]);

  return (
    <View style={styles.root}>
      {/*  header */}
      <MoviesHeader
        value={search}
        onChange={(value) => setSearch(value)}
        open={open}
        setOpen={setOpen}
      />
      {/*  list */}
      {!loading ? (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} favourites={favourites} />}
          onEndReachedThreshold={0.7}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3BB7DB" />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
