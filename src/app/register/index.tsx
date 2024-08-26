import { TextInput } from "@/ui/textInput";
import { router } from "expo-router";
import { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";

export default function Register() {
  const [register, setRegister] = useState({
    invite: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (value: string, field: string) => {
    setRegister({ ...register, [field]: value });
  };

  const handleSubmit = () => {
    console.log(register);
  };

  return (
    <SafeAreaView className="items-center justify-center h-screen">
      <View className="gap-4">
        <Text className="text-5xl font-bold">Cadastro - KDS</Text>
        <TextInput
          placeholder="Código de convite"
          onChangeText={handleChange}
          value={register.invite}
          id="invite"
          type="numeric"
        />
        <TextInput
          placeholder="Usuário"
          onChangeText={handleChange}
          value={register.username}
          id="username"
        />
        <TextInput
          placeholder="Senha"
          password
          onChangeText={handleChange}
          value={register.password}
          id="password"
        />
        <TextInput
          placeholder="Repita a senha"
          password
          onChangeText={handleChange}
          value={register.repeatPassword}
          id="repeatPassword"
        />
        <Pressable className="bg-primary p-4 rounded-lg" onPress={handleSubmit}>
          <Text className="text-white font-bold text-lg text-center uppercase">
            Cadastrar
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/")}>
          <Text className="text-primary text-center">
            Caso já tenha cadastro, clique aqui
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
