import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
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
  Button,
} from "react-native";
import { User } from "./src/types/model";
import * as SecureStore from "expo-secure-store";

const queryClient = new QueryClient();

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("Here's your value \n" + result);
  } else {
    console.log("No values stored under that key.");
  }
}

function Register() {
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);
  const ref_input4 = useRef<TextInput>(null);
  const ref_input5 = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");

  const register = useMutation(
    (user: User) => {
      return axios.post<{ token: string }>(
        `https://api-nodejs-todolist.herokuapp.com/user/register`,
        user
      );
    },
    {
      onSuccess: (response) => {
        save("token", response.data.token);
      },
      onError: () => {
        console.error("nie zarejestrowano");
      },
    }
  );

  useEffect(() => {
    ref_input2.current?.focus();
  }, []);

  const onSubmit = () => {
    register.mutate({ email, password, name, age });
  };

  return (
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
        onChangeText={setEmail}
        returnKeyType="next"
        placeholder="Email"
        // keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        ref={ref_input3}
        onSubmitEditing={() => {
          setTimeout(() => {
            if (ref_input4.current) {
              ref_input4.current.focus();
            }
          }, 3000);
        }}
        autoCapitalize="words"
        autoComplete="off"
        autoCorrect={false}
        blurOnSubmit={false}
        onChangeText={setName}
        returnKeyType="next"
        placeholder="Name"
        // keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        ref={ref_input4}
        onSubmitEditing={() => {
          setTimeout(() => {
            if (ref_input5.current) {
              ref_input5.current.focus();
            }
          }, 3000);
        }}
        autoCapitalize="words"
        autoComplete="off"
        autoCorrect={false}
        keyboardType="numeric"
        blurOnSubmit={false}
        onChangeText={(textValue) => {
          if (!isNaN(parseInt(textValue))) {
            setAge(parseInt(textValue));
          } else if (textValue === "") {
            setAge(0);
          }
        }}
        returnKeyType="next"
        placeholder="Age"
        // keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        ref={ref_input5}
        onSubmitEditing={() => {
          console.log(1234);
        }}
        onBlur={() => {
          console.log("I am blurring");
        }}
        returnKeyType="done"
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      <Button onPress={onSubmit} title="Rejestruj" />
    </View>
  );
}

export default function App() {
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
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
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
