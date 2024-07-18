// screens/BookmarksScreen.js
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksScreen = ({navigation}) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const storedBookmarks =
          JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
        setBookmarks(storedBookmarks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarks();
  }, []);

  const renderBookmark = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetail', {job: item})}>
      <View style={styles.jobCard}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.salary}>{item.salary}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text>No bookmarks available</Text>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmark}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  jobCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  salary: {
    fontSize: 16,
    color: 'green',
  },
  phone: {
    fontSize: 14,
    color: 'blue',
  },
});

export default BookmarksScreen;
