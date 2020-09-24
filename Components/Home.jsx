import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { Page } from './Styles.js';

function GetActualDate(){
  var a = new Date(Date.now());
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

export default function Home(props) {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=yourapikey`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setCity(data.name);
          setTemperature(
            `${data.main.temp}°С, feels like ${data.main.feels_like}, himidity - ${data.main.humidity}`
          );

          const objectToSend = {
            time: GetActualDate(),
            location: `${location.coords.latitude} - ${location.coords.longitude} - ${data.name}`,
            archieve: `${data.main.temp}°С, feels like ${data.main.feels_like}, himidity - ${data.main.humidity}`
          }
          props.addToStorage(JSON.stringify(objectToSend));
        });
    })();
  }, []);

  return (
    <View style={Page.container}>
      <Text style={Page.containerItem}>
        <Text style={Page.text}>
          {location
            ? `Coords: ${location.latitude} - ${location.longitude}`
            : errorMsg}
        </Text>
        <Text style={Page.text}>{city ? city : "Waiting..."}</Text>
        <Text style={Page.text}>
          {temperature ? temperature : "Waiting..."}
        </Text>
      </Text>
    </View>
  );
}