import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import PeopleBySpecies from "./components/PeopleBySpecies";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>React Native Challenge</Text>
      <PeopleBySpecies />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
