import Fab from "@/components/Fab";
import React from "react";
import { ScrollView, Text } from "react-native";

const Page = () => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Search</Text>
      </ScrollView>
      <Fab />
    </>
  );
};

export default Page;
