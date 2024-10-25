import { ResponsivePie } from "@nivo/pie";
import React from 'react'

export interface PieChartProps {
  variant?: "primary" | "secondary";
  data: { id: string; label: string; value: number }[];
}

export const PieChart = ({ variant = "primary", data }: PieChartProps) => (
  <ResponsivePie
    data={data}
    margin={{ top: 0, right: 25, bottom: 40, left: 25 }}
    startAngle={-68}
    innerRadius={0.5}
    cornerRadius={45}
    activeInnerRadiusOffset={7}
    activeOuterRadiusOffset={5}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["opacity", 0]],
    }}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={9}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    enableArcLabels={false}
    arcLabelsRadiusOffset={0.45}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    colors={variant === "primary" ? ["#FFCEB0", "#FF6001"]: variant === "secondary" ? ["#DEDEE0", "#FFFFFF"]: []}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    legends={[]}
  />
);
