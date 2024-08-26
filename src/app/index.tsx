import { TextInput } from "@/ui/textInput";
import { router } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function Login() {
  return (
    <SafeAreaView className="items-center justify-center h-screen">
      <View className="gap-4">
        <Text className="text-5xl font-bold">Acesso - KDS</Text>
        <TextInput placeholder="Usuário" />
        <TextInput placeholder="Senha" password />
        <Pressable className="bg-primary p-4 rounded-lg">
          <Text className="text-white font-bold text-lg text-center uppercase">
            Acessar
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/register")}>
          <Text className="text-primary text-center">
            Caso não tenha cadastro ainda, clique aqui
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
