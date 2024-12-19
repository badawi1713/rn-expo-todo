import MoreButton from "@/components/MoreButton";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Upcoming",
          headerShadowVisible: false,
          headerRight: () => <MoreButton pageName="" />,
        }}
      />
    </Stack>
  );
};

export default Layout;
