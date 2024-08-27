import { Header } from "@/ui/components/header";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import * as store from "expo-secure-store";

export default function Config() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (JSON.parse(store.getItem("user")).isAdmin.includes("rue"))
      setAdmin(true);
  }, []);
  return (
    <>
      <Header title="Configurações" />
      <SafeAreaView>
        <View className="m-8 gap-4">
          {admin && (
            <>
              <Pressable
                className="bg-primary p-4 rounded-xl gap-4 flex-row"
                onPress={() => router.push("/config/manage-users")}
              >
                <FontAwesome name="user" size={24} color="white" />
                <Text className="text-white text-2xl font-bold">
                  Gerenciar usuários
                </Text>
              </Pressable>
              <Pressable
                className="bg-primary p-4 rounded-xl flex-row gap-4"
                onPress={() => router.push("/config/manage-flows")}
              >
                <Entypo name="flow-branch" size={24} color="white" />
                <Text className="text-white text-2xl font-bold">
                  Gerenciar fluxos
                </Text>
              </Pressable>
            </>
          )}
          <Pressable
            className="bg-primary p-4 rounded-xl flex-row gap-4"
            onPress={async () => {
              await SecureStore.deleteItemAsync("token");
              await SecureStore.deleteItemAsync("user");
              router.push("/");
            }}
          >
            <MaterialIcons name="exit-to-app" size={24} color="white" />
            <Text className="text-white text-2xl font-bold">Sair</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}
