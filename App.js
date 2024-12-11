//IM/2021/063

import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./util/calculator";

export default class App extends Component {
  state = initialState;

  // Handle tap method
  HandleTap = (type, value) => {
    console.log("Button Pressed: Type =", type, ", Value =", value); 
    this.setState((state) => calculator(type, value, state));
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Previous Calculation */}
          <Text style={styles.previousValue}>
            {this.state.previousExpression}
          </Text>

          {/* Current Value */}
          <Text style={styles.value}>
          {this.state.error
          ? "ERROR!"
          : parseFloat(this.state.currentValue).toFixed(9).replace(/\.?0+$/, "")} {/* Format to 9 decimal places */}
          </Text>


          <Row>
            <Button
              text="C"
              theme="clear"
              onPress={() => this.HandleTap("clear")}
            />
            <Button
              text="√"
              theme="secondary"
              onPress={() => this.HandleTap("sqrt")}
            />
            <Button
              text="%"
              theme="secondary"
              onPress={() => this.HandleTap("percentage")}
            />
            <Button
              text="/"
              theme="accent"
              onPress={() => this.HandleTap("operator", "/")}
            />
          </Row>

          <Row>
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" onPress={() => this.HandleTap("number", 9)} />
            <Button
              text="X"
              theme="accent"
              onPress={() => this.HandleTap("operator", "*")}
            />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.HandleTap("number", 4)} />
            <Button text="5" onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" onPress={() => this.HandleTap("number", 6)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.HandleTap("operator", "-")}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" onPress={() => this.HandleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.HandleTap("operator", "+")}
            />
          </Row>

          <Row>
            <Button text="0" onPress={() => this.HandleTap("number", 0)} />
            <Button text="." onPress={() => this.HandleTap("number", ".")} />
            <Button
              text="⌫"
              theme="primary"
              onPress={() => this.HandleTap("backspace")}
            />
            <Button
              text="="
              theme="clear"
              onPress={() => this.HandleTap("equal", "=")}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 52,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  previousValue: {
    color: "#888",
    fontSize: 24,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 5,
  },
});
