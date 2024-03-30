import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const ReviewCard = () => {
  const [rating, setRating] = useState(2);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.name}>Michelle Evans</Text>
          <Text style={styles.date}>5mo. ago</Text>
        </View>
        <View style={styles.starContainer}>
          {[...Array(5)].map((star, i) => {
            currentValue = i + 1;
            return (
              <>
                <Icon
                  name={"star"}
                  color={currentValue <= rating ? "#0093ED" : "black"}
                  key={i}
                  size={15}
                />
              </>
            );
          })}
        </View>
      </View>
      <Text style={styles.content}>
        blah blah blah blah blah blah blah blah blah blah blah blah blah blah
        blah blah blah blah blah blah blah blah blah blah
      </Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#C4DDEF",
    borderRadius: 8,
    padding: 17,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    flexDirection: "row",
    gap: 10,
  },
  starContainer: {
    flexDirection: "row",
    gap: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0093ED",
  },
  content: {
    fontSize: 14,
  },
});
