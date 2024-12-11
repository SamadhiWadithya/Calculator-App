//IM/2021/063

import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];


  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  } else if (theme === "clear") {
    buttonStyles.push(styles.buttonClear); // Apply the clear button style
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

// Set dimensions
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#272725", // Updated color (dark gray)
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    width: buttonWidth, // Set the width to match the button's width
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20, // Rounded corners
    borderWidth: 2,
    borderColor:"#323538",
    margin: 5,
  },
  text: {
    color: "#fff", // Text color remains white
    fontSize: 24,
  },
  textSecondary: {
    color: "#fafafa", // text color (almost black)
  },
 
  buttonSecondary: {
    backgroundColor: "#094966", // color (light gray)
    borderColor: "#03adfc", // Border color blue 
  },
  buttonAccent: {
    backgroundColor: "transparent", // Make button background transparent
    borderColor: "#1a8a88", // Border color teal
  },
  buttonClear: {
    backgroundColor: "#1d848a", 
    borderColor: "#1bc8d1", // Light cyan border
  },
});
