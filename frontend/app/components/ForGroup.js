import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function ForGroup() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                For Group
            </Text>
            <ScrollView horizontal={true}>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('thai')}>
                    <Image source={require('./thai.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function handleClick(type) {
    // Handle click event based on the type of image
    console.log('Clicked:', type);
    {/*
        navigation.navigate('Restaurant');
        */}
    
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 300,
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left', // corrected spelling
    },
    image: {
        width: 200,
        height: 120,
        margin: 5, // Add some margin between images
    },
});


