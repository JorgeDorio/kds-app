import { api } from "@/api";
import { TextInput } from "@/ui/textInput";
import { useToast } from "@/ui/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function Register() {
  const toast = useToast();
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
    const { invite, password, repeatPassword, username } = register;
    if (invite.length != 6) toast.error("Código de convite inválido");
    else if (username.length < 3)
      toast.error("O nome de usuário deve conter pelo menos 3 caracteres");
    else if (password.length < 4)
      toast.error("A senha deve ter pelo menos 4 caracteres");
    else if (password != repeatPassword) toast.error("Senhas divergente");
    else {
      api
        .post("/user/create", {
          inviteCode: invite,
          username,
          password,
        })
        .then((res) => {
          toast.success(res.data);
          router.push("/")
        })
        .catch((e) => {
          toast.error(e.response.data);
        });
    }
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
