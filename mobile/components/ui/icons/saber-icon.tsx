import { Text } from "react-native";

export function SaberIcon({ testID }: { testID?: string } = {}) {
  return (
    <Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -3,
      }}
      testID={testID}
    >
      ⚔️
    </Text>
  );
}
