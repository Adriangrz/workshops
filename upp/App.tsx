import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);

  useEffect(() => {
    ref_input2.current?.focus();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <TextInput
            style={styles.textInput}
            ref={ref_input2}
            onSubmitEditing={() => {
              setTimeout(() => {
                if (ref_input3.current) {
                  ref_input3.current.focus();
                }
              }, 3000);
            }}
            autoCapitalize="words"
            autoComplete="off"
            autoCorrect={false}
            blurOnSubmit={false}
            returnKeyType="next"
            placeholder="Email"
            // keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            ref={ref_input3}
            onSubmitEditing={() => {
              console.log(1234);
            }}
            onBlur={() => {
              console.log("I am blurring");
            }}
            returnKeyType="done"
            placeholder="Password"
            secureTextEntry={true}
          />
          <StatusBar style="auto" />
          <TouchableOpacity>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
});
