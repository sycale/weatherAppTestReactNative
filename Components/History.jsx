import React from "react";
import { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, Button } from "react-native";
import { Page } from "./Styles.js";
import HistoryElem from "./HistoryElem.jsx";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: null,
      requestArray: props.elem,
    };
    this.handleResetRequests = this.handleResetRequests.bind(this);
  }

  handleResetRequests() {
    localStorage.clear();
    this.setState({
      requestArray: [],
    });
  }

  render() {
    return (
      <SafeAreaView style={Page.container}>
        <ScrollView style={Page.viewElem}>
          {this.state.requestArray.map((e, i) => {
            e = JSON.parse(e);
            return (
              <View key={i}>
                <View>
                  <Text
                    style={Page.text}
                    onClick={() =>
                      this.setState({ activeItem: JSON.stringify(e.time) })
                    }
                  >
                    {e.time}, {e.location}
                  </Text>
                </View>
                {this.state.activeItem === JSON.stringify(e.time) && (
                  <Text style={Page.text}>{e.archieve}</Text>
                )}
              </View>
            );
          })}
          <Button title="Reset Requests" onPress={this.handleResetRequests} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
