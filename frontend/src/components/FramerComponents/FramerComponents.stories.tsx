import React, { Component } from "react";
import { AnimatedGrid } from "./index";

export default {
  title: "components/FramerComponents/AnimatedGrid",
  component: AnimatedGrid,
  parameters: { status: { type: "beta" } },
};

export const Default = (args: any) => <AnimatedGrid {...args} />;
