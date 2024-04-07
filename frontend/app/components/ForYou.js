import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';


export default function ForYou({chat}) {
    function handleClick(type) {
        // Handle click event based on the type of image

        console.log('Clicked:', type);
        {/*
        navigation.navigate('Restaurant');
        */}

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>For {chat.chatName}</Text>
            
             <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClick('fish')}>
                    <Image source={require('./fish.png')} style={styles.image} />
                    <Text style={{ textAlign: 'center' }}>Name</Text>
            </TouchableOpacity>
                

            </ScrollView>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'top', // Align items to the center vertically
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 0, // Remove margin above the text
    },
    image: {
        width: 200,
        height: 120,
    },
});

