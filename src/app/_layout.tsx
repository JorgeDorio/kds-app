import { StatusBar } from "expo-status-bar";
import "../global.css";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { ToastContextContainer } from "@/ui/toast";

export default function Layout() {
  return (
    <ToastContextContainer>
      <Slot />
      <StatusBar hidden />
    </ToastContextContainer>
  );
}
