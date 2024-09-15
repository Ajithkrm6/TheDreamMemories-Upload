import React, { ReactDOM } from "react";

export interface BarChartProps {
  children: string;
}

export const BarChart = (props: BarChartProps) => {
  return <div>{props.children}</div>;
};
