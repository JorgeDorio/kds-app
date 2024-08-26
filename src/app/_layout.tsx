import { StatusBar } from "expo-status-bar";
import "../global.css";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <>
      <Slot />
      <StatusBar hidden />
    </>
  );
}
