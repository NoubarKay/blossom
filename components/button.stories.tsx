import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/ui/button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      description: "Button size",
      options: ["filled", "ghost", "outline", "subtle", "text"],
    },
    bg: {
      control: "select",
      description: "Button size",
      options: [
        "gray",
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "pink",
        "rose",
      ],
    },
    size: {
      control: "select",
      description: "Button size",
      options: ["xs", "sm", "md", "lg", "xl", "icon"],
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    radius: {
      control: "select",
      description: "Rounded",
      options: ["sm", "md", "lg", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    size: "sm",
    variant: "filled",
    bg: "blue",
    fullWidth: false,
    radius: "md",
  },
};
