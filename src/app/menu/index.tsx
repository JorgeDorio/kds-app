import { api } from "@/api";
import { Header } from "@/ui/components/header";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
export default function Page() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    api.get("station").then((res) => {
      setStations(res.data);
    });
  }, []);

  return (
    <>
      <Header title="Selecione sua estação de trabalho" />
      <SafeAreaView className="flex-1 m-8">
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <Link href={`/station/${item.id}`} asChild push>
                <Pressable className="items-center bg-primary flex-grow p-5 flex-1 rounded-lg m-2 h-40 justify-center">
                  <Text className="text-white font-bold text-4xl">
                    {item.name}
                  </Text>
                </Pressable>
              </Link>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
}
