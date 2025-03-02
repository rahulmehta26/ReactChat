import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  customStyle? :object | object[];
}

const CustomSafeAreaView: React.FC<CustomSafeAreaViewProps> = ({
  children,
  customStyle
}) => {
  return (
    <SafeAreaView style = {[styles.container, customStyle]} >{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f5f5f5",
    color: "black",
  },
});

export default CustomSafeAreaView;
