// screens/JobsScreen.js
import React from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

// Function to fetch jobs data from the API
const fetchJobs = async ({ pageParam = 1 }) => {
    const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageParam}`);
    return response.data;
};

const JobsScreen = ({ navigation }) => {
    // Using useInfiniteQuery to handle infinite scrolling
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.nextPage ? pages.length + 1 : false;
        },
    });

    // Function to render each job item
    const renderJob = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { job: item })}>
            <View style={styles.jobCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.primary_details.Place}</Text>
                <Text style={styles.salary}>{item.primary_details.Salary}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {status === 'loading' ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : status === 'error' ? (
                <Text>Error: {error.message}</Text>
            ) : (
                <FlatList
                    data={data?.pages?.flatMap(page => page.jobs) || []}
                    renderItem={renderJob}
                    onEndReached={() => {
                        if (hasNextPage) fetchNextPage();
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
        shadowOffset: { width: 0, height: 2 },
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

export default JobsScreen;
