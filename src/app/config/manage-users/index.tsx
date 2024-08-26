import { api } from "@/api";
import { Header } from "@/ui/components/header";
import { Modal } from "@/ui/modal";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ManageUsers() {
  const [showModal, setShowModal] = useState(false);
  const [inviteCode, setInviteCode] = useState();

  const generateInviteCode = () => {
    setShowModal(true);
    api.post("/user/invite").then((res) => {
      setInviteCode(res.data);
      setShowModal(false);
    });
  };

  return (
    <>
      {showModal && (
        <Modal>
          <ActivityIndicator size="large" />
        </Modal>
      )}
      <SafeAreaView>
        <Header title="Gerenciar usuários" />
        <View className="m-8 flex-row gap-4 items-center flex-wrap">
          <Pressable
            className="bg-primary p-4 rounded-xl"
            onPress={generateInviteCode}
          >
            <Text className="text-white text-xl font-bold">
              GERAR CÓDIGO DE CONVITE
            </Text>
          </Pressable>
          <Text className="text-4xl font-bold">{inviteCode}</Text>
          <View className="flex-row gap-2 flex-wrap items-start">
            <AntDesign name="warning" size={24} color="black" />
            <Text className="text-lg text-wrap">
              Este código expira em 2 horas. Informe-o para o novo usuário e
              solicite que ele complete o cadastro
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
