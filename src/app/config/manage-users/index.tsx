import { api } from "@/api";
import { Header } from "@/ui/components/header";
import { Modal } from "@/ui/modal";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Checkbox from "expo-checkbox";
import * as Clipboard from "expo-clipboard";
import Feather from "@expo/vector-icons/Feather";
import { useToast } from "@/ui/toast";

export default function ManageUsers() {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [inviteCode, setInviteCode] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("user").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const generateInviteCode = () => {
    setShowModal(true);
    api.post("/user/invite").then((res) => {
      setInviteCode(res.data);
      setShowModal(false);
    });
  };

  return (
    <>
      <Header title="Gerenciar usuários" />
      {showModal && (
        <Modal>
          <ActivityIndicator size="large" />
        </Modal>
      )}
      <SafeAreaView>
        <View>
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
            {inviteCode != null && (
              <>
                <Pressable
                  className="p-4"
                  onPress={async () => {
                    await Clipboard.setStringAsync(inviteCode);
                    toast.success("Código de convite copiado");
                  }}
                >
                  <Feather name="copy" size={24} color="black" />
                </Pressable>
                <View className="flex-row gap-2 flex-wrap items-start">
                  <AntDesign name="warning" size={24} color="black" />
                  <Text className="text-lg text-wrap">
                    Este código expira em 2 horas. Informe-o para o novo usuário
                    e solicite que ele complete o cadastro
                  </Text>
                </View>
              </>
            )}
          </View>
          <View className="m-8">
            <View className="flex-row gap-8 border-b p-2">
              <Text className="text-lg font-bold flex-1 text-center">ID</Text>
              <Text className="text-lg font-bold flex-1 text-center">Nome</Text>
              <Text className="text-lg font-bold flex-1 text-center">
                Administrador
              </Text>
              <Text className="text-lg font-bold flex-1 text-center">
                Ações
              </Text>
            </View>
            {users.map((u, i) => (
              <View
                key={u.id}
                className="flex-row gap-8 border-b items-center p-2"
              >
                <Text className="text-lg font-semibold flex-1 text-center">
                  {i + 1}
                </Text>
                <Text className="text-lg font-semibold flex-1 text-center">
                  {u.fullName}
                </Text>
                <View className="flex-1 items-center">
                  <Checkbox value={u.admin} />
                </View>
                <View className="flex-1 flex-row justify-center">
                  <Pressable className="bg-primary rounded-full p-4">
                    <Entypo name="edit" size={24} color="white" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
