import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { accentColor, darkColor, primaryColor } from './ComponentColors';
import fish from "../../assets/fish.png"

export default function ForYou({chat}) {
	function handlePress() {
		console.log("Hello again");
	}


	return (
		<View style={styles.container}>
			<Text style={styles.title}>Group "{chat.chatName}" might like:</Text>
			
			<ScrollView 
				horizontal={true} 
				contentContainerStyle={styles.scrollViewContent}
				showsHorizontalScrollIndicator={false}
				snapToInterval={118}
				decelerationRate={"fast"}
			>
				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Torchy's Tacos</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Name</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Name</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Name</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Name</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Name</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={handlePress}>
					<Image source={fish} style={styles.image} />
					<Text style={styles.nameText}>Name</Text>
				</TouchableOpacity>
				


			</ScrollView>
			
			
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        alignItems: 'flex-start',
        gap: 9,
				backgroundColor: primaryColor
    },
    title: {
        fontSize: 24,
        fontFamily: "Metropolis-Bold",
        color: darkColor,
				paddingLeft: 16
    },
    scrollViewContent: {
			gap: 18,
			paddingLeft: 16
    },
    image: {
        width: 130,
        height: 100,
				borderRadius: 8
    },
    nameText: {
        textAlign: 'center',
        fontFamily: "Metropolis-Medium",
        fontSize: 14,
        color: darkColor
    },
});
