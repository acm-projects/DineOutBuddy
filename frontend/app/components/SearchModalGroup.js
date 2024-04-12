import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { primaryColor, secondaryColor } from "./ComponentColors";
import { TouchableHighlight, TouchableOpacity } from "@gorhom/bottom-sheet";
import SearchModalGroup from "./SearchModalGroup";
import Icon from "react-native-vector-icons/Ionicons";

export default function SearchModalMain ({navigation}) {
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.navigate("SearchModalMain")}>
						<Icon name="chevron-back-outline" size={20} color="black"></Icon>
					</TouchableOpacity>
					<Text style={[styles.text, {paddingLeft: 0}]}>Choose Group</Text>
				</View>
				{/* Group options go here */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "Metropolis-SemiBold",
		fontSize: 20,
		paddingLeft: 16
	},
	container: {
		backgroundColor: secondaryColor,
		flex: 1,
		gap: 8
	},
	headerContainer: {
		backgroundColor: primaryColor
	},
	header: {
		paddingTop: 18,
		paddingBottom: 20,
		paddingHorizontal: 16,
		justifyContent: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	}
})