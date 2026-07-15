"use client";

import React from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
}

export default function CircularProgress({
  percentage,
  size = 64,
  strokeWidth = 2.8,
  colorClass = "text-primary",
}: CircularProgressProps) {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      className="circular-chart"
      width={size}
      height={size}
      viewBox="0 0 36 36"
    >
      <path
        className="circle-bg"
        d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
      />
      <path
        className={`circle ${colorClass}`}
        d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
        stroke="currentColor"
        strokeDasharray={`${percentage}, 100`}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
