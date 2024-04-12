import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { accentClick, accentColor, primaryColor, secondaryColor } from "./ComponentColors";
import { TouchableHighlight, TouchableOpacity, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import { useLogin } from "../../context/LoginProvider";
import client from "../api/client";


export default function SearchModalMain ({navigation}, props) {

	const { profile } = useLogin();

  const [cravings, setCravings] = useState([]);
	const [preferences, setPreferences] = useState([]);
  const [allergies, setAllergies] = useState(profile.allergies);

  const allCravings = [
    "Italian",
    "Japanese",
    "Chinese",
    "Mediterranean",
    "Seafood",
    "Mexican",
    "American",
    "Indian",
    "Middle Eastern",
    "Korean",
    "Indonesian",
    "+",
  ];

	const allPreferences = [
    "Vegetarian",
    "Halal",
    "Vegan",
    "Kosher",
    "Pescatarianism",
    "Keto",
  ];

  const allAllergies = [
    "Eggs",
    "Lactose",
    "Seafood",
    "Wheat",
    "Sesame",
    "Soy",
    "Tree Nuts",
    "Peanuts",
    "Gluten",
  ];

	const handleChangeCraving = (craving) => {
    if (!cravings.includes(craving)) {
      setCravings((prev) => [...prev, craving]);
    } else {
      setCravings(cravings.filter((c) => c != craving));
    }
  };

	const handleChangePreference = (preference) => {
    if (!preferences.includes(preference)) {
      setPreferences((prev) => [...prev, preference]);
    } else {
      setPreferences(preferences.filter((a) => a != preference));
    }
  };

  const handleChangeAllergy = (allergy) => {
    if (!allergies.includes(allergy)) {
      setAllergies((prev) => [...prev, allergy]);
    } else {
      setAllergies(allergies.filter((a) => a != allergy));
    }
  };

	const handleSubmit = async () => {
		// TODO: fill in this function to integrate w the backend
		// TODO: make this function call the calling component's "closeModal" func
  };

	return (
		<View style={styles.container}>
			<View style={styles.groupContainer}>
				<TouchableOpacity style={styles.groupSelector} onPress={() => navigation.navigate("SearchModalGroup")}>
					<Text style={[styles.text, {paddingLeft: 0}]}>Filter by Group</Text>
					<View style={{flex: 1}} />
					<Icon name="chevron-forward-outline" size={20} color="black"></Icon>
				</TouchableOpacity>
			</View>
			<View style={styles.filterContainer}>
				<Text style={styles.text}>Cravings</Text>
				<ScrollView contentContainerStyle={styles.buttonContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
					{allCravings.map((c) => (
						<View style={{marginRight: 5}}>
							<TouchableOpacity
								key={c}
								onPress={() => { handleChangeCraving(c); }}
								style={[
									{ backgroundColor: cravings.includes(c) ? accentColor : "transparent" },
									styles.card,
								]}
							>
								<Text
									style={[
										{ color: cravings.includes(c) ? primaryColor : accentColor },
										styles.cardText,
									]}
								>
									{c}
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</View>
			<View style={styles.filterContainer}>
				<Text style={styles.text}>Restrictions</Text>
				<ScrollView contentContainerStyle={styles.buttonContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
					{allPreferences.map((p) => (
						<TouchableOpacity
							key={p}
							onPress={() => {
								handleChangePreference(p);
							}}
							style={[
								{
									backgroundColor: preferences.includes(p)
										? accentColor
										: "transparent",
								},
								styles.card,
							]}
						>
							<Text
								style={[
									{ color: preferences.includes(p) ? primaryColor : accentColor },
									styles.cardText,
								]}
							>
								{p}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
			<View style={styles.filterContainer}>
				<Text style={styles.text}>Allergies</Text>
				<ScrollView contentContainerStyle={styles.buttonContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
					{allAllergies.map((a) => (
						<TouchableOpacity
							key={a}
							onPress={() => {
								handleChangeAllergy(a);
							}}
							style={[
								{
									backgroundColor: allergies.includes(a)
										? accentColor
										: "transparent",
								},
								styles.card,
							]}
						>
							<Text
								style={[
									{ color: allergies.includes(a) ? primaryColor : accentColor },
									styles.cardText,
								]}
							>
								{a}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
			<View style={styles.submitContainer}>
				<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
						<Text style={styles.submitText}>Save Changes</Text>
				</TouchableOpacity>
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
	groupContainer: {
		backgroundColor: primaryColor
	},
	groupSelector: {
		paddingTop: 18,
		paddingBottom: 20,
		paddingHorizontal: 16,
		justifyContent: "flex-start",
		flexDirection: "row",
		alignItems: "center"
	},
	filterContainer: {
		backgroundColor: primaryColor,
		paddingTop: 18,
		paddingBottom: 20,
		gap: 10,
		justifyContent: "flex-start",
		flexDirection: "column",
		alignItems: "left"
	},
	buttonContainer: {
		gap: 5,
		paddingHorizontal: 16
	},
	card: {
    minWidth: 60,
    borderRadius: 40,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: accentColor,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Metropolis-SemiBold"
  },
	submitContainer: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: primaryColor,
		alignItems: "center",
		justifyContent: "flex-start"
	},
	submitButton: {
		paddingVertical: 12,
		paddingHorizontal: 28,
		backgroundColor: accentColor,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center"
	},
	submitText: {
		fontFamily: "Metropolis-Medium",
		fontSize: 16,
		color: primaryColor
	}

	
})