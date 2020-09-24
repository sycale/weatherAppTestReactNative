import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home.jsx";
import History from "./History.jsx";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

// localStorage.clear();

export default function App() {
  let requestArray = [];

  function clearArray() {
    requestArray = [];
  }
  function addToStorage(item) {
    localStorage.setItem(localStorage.length + 1, item);
    for (let i = 1; i <= localStorage.length; i += 1) {
      if (localStorage.getItem(i)) {
        requestArray.push(localStorage.getItem(i));
      }
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          children={() => <Home addToStorage={addToStorage} />}
        />
        <Tab.Screen
          name="History"
          children={() => (
            <History elem={requestArray} handleReset={clearArray} />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
