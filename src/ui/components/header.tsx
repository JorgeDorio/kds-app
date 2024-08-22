import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IHeaderProps {
  title?: string;
}

export function Header({ title }: IHeaderProps) {
  return (
    <View className="bg-primary p-4 flex-row justify-between">
      <TouchableOpacity onPress={() => router.back()} className="flex-row">
        <AntDesign name="caretleft" size={24} color="white" />
        <Text className="text-white font-bold text-xl">Voltar</Text>
      </TouchableOpacity>
      <Text className="text-white font-bold self-center text-xl">{title}</Text>
    </View>
  );
}
