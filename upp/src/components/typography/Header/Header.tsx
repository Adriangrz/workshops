import { Text } from "react-native";
import React from "react";

// - Header
//     - Should take variant `h1` `h2` `h3` `h4` `h5` props
//     - Should take `color` prop, default `#070B11`
//     - Font size `60px` `48px` `44px` `32px` `25px`
//     - Font weight `700`
//     - Font family - TBD

type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return <Text>{children}</Text>;
}
