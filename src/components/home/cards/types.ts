import React from "react";

type StatTone = "primary" | "green" | "amber" | "red" | "page";

type StatCardProps = {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon: React.ReactNode;
  color: StatTone;
};

type ModuleCardProps = {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  iconColor: string;
};

export type { ModuleCardProps, StatCardProps, StatTone };
