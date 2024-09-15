import React, { Component } from "react";
import { SearchInput } from "./index";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: { status: { type: "beta" } },
};

export const Default = (args: any) => <SearchInput {...args} />;

// Default.args={}
