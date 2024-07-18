// screens/JobDetailScreen.js
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobDetailScreen = ({route}) => {
  const {job} = route.params;

  // Function to bookmark a job
  const bookmarkJob = async () => {
    try {
      const bookmarks =
        JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
      bookmarks.push(job);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      alert('Job bookmarked successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>{job.city_location}</Text>
      <Text style={styles.salary}>{job.primary_details.Salary}</Text>

      <Button title="Bookmark Job" onPress={bookmarkJob} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 20,
    color: 'gray',
  },
  salary: {
    fontSize: 20,
    color: 'green',
  },
  phone: {
    fontSize: 18,
    color: 'blue',
  },
});

export default JobDetailScreen;
