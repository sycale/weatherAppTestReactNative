import { StyleSheet } from "react-native";

const Page = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 25,
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
      alignItems: "center",
      padding: 40
  },
    containerItem: { display: "flex", flexDirection: "column", fontSize: "16" },
    viewElem: {
      padding: 50
  }
});

export { Page };