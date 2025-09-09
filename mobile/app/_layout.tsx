import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Star Wars Challenge",
            headerStyle: {
              backgroundColor: "#f8f9fa",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
