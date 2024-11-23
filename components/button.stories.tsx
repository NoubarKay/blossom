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
      description: "Button variant",
      options: ["filled", "ghost", "outline", "subtle", "text"],
    },
    bg: {
      control: "select",
      description: "Button color",
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
    size: "lg",
    variant: "subtle",
    bg: "teal",
    fullWidth: false,
    radius: "md",
  },
};
