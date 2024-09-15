import { title } from "process";
import { BarChart } from "./index";
import { Component } from "react";

export default {
  title: "Components/BarCHart",
  component: BarChart,
  parameters: { status: { type: "beta" } },
};

export const Default = (args: any) => <BarChart {...args} />;

Default.args = {
  children: "Hello world",
};
