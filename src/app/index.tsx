import { api } from "@/api";
import { TextInput } from "@/ui/textInput";
import { useToast } from "@/ui/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import * as store from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const toast = useToast();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (value: string, field: string) => {
    setLogin({ ...login, [field]: value });
  };

  const handleSubmit = () => {
    const { password, username } = login;
    if (username.length < 3)
      toast.error("O nome de usuário deve conter pelo menos 3 caracteres");
    else if (password.length < 4)
      toast.error("A senha deve ter pelo menos 4 caracteres");
    else {
      api
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          store.setItem("token", res.data);
          store.setItem("user", JSON.stringify(jwtDecode(res.data)));
          router.push("/menu");
        })
        .catch((e) => {
          toast.error(e.response.data);
        });
    }
  };

  return (
    <SafeAreaView className="items-center justify-center h-screen">
      <View className="gap-4">
        <Text className="text-5xl font-bold">Acesso - KDS</Text>
        <TextInput
          placeholder="Usuário"
          onChangeText={handleChange}
          value={login.username}
          id="username"
        />
        <TextInput
          placeholder="Senha"
          password
          onChangeText={handleChange}
          value={login.password}
          id="password"
        />
        <Pressable className="bg-primary p-4 rounded-lg" onPress={handleSubmit}>
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
