import axios from "axios";
import { Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";

const axiosConfig = {
  baseURL: "http://localhost:5000",
  withCredentials: false,
};

const axiosInstance = axios.create(axiosConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Console log" onPress={() => console.log("pressed")} />
      <Button
        title="Set"
        onPress={() =>
          axiosInstance.post("/set").then(async (r) => {
            const accessToken = r.data["access_token"];
            await SecureStore.setItemAsync("accessToken", accessToken);
            console.log("Set", accessToken);
          })
        }
      />
      <Button
        title="Retrieve access token"
        onPress={async () => {
          const accessToken = await SecureStore.getItemAsync("accessToken");
          console.log("Retrieved", accessToken);
        }}
      />
      <Button
        title="Get protected"
        onPress={async () => {
          const accessToken = await SecureStore.getItemAsync("accessToken");
          axiosInstance
            .get("/protected", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((r) => console.log(r.data));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
