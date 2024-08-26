import { ReactNode } from "react";
import { View } from "react-native";

interface IModalProps {
  children: ReactNode;
}

export function Modal({ children }: IModalProps) {
  return (
    <View
      className="left-0 top-0 h-screen w-screen absolute z-10 justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <View className="bg-white p-8 rounded-xl opacity-100">{children}</View>
    </View>
  );
}
