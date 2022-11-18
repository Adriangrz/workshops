import { Text } from "react-native";
import React from "react";

// - Paragraph
//     - Should take `color` prop, default `#070B11`
//     - Font size `12px`
//     - Font weight `600`
//     - Font family - TBD

type Props = {
  children: React.ReactNode;
};

export default function Paragraph({ children }: Props) {
  return <Text>{children}</Text>;
}
