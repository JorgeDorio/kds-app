import { api } from "@/api";
import { IOrderDetails } from "@/interfaces/IOrderDetails";
import { Header } from "@/ui/components/header";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Station() {
  const { station } = useLocalSearchParams();
  const [stationName, setStationName] = useState("");
  const [orders, setOrders] = useState<IOrderDetails[]>();

  useEffect(() => {
    api.get(`order/${station}`).then((res) => {
      setStationName(res.data.name);
      setOrders(res.data.orders);
    });
  }, []);

  return (
    <>
      <Header title={stationName} />
      <SafeAreaView>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <>
                <View className="bg-primary flex-grow p-4 flex-1 rounded-lg m-2 flex-row justify-between">
                  <View className="justify-center gap-2">
                    <Text className="text-white font-bold text-xl">
                      {item.title}
                    </Text>
                    {item.flavors.map((flavor) => (
                      <Text key={item.id + flavor} className="text-white">
                        {flavor}
                      </Text>
                    ))}

                    {item.doughType && (
                      <Text className="text-white">
                        Massa: {item.doughType}
                      </Text>
                    )}

                    {item.observation.length > 0 && (
                      <View className="bg-yellow-200 px-2 py-1 rounded">
                        {item.observation.map((flavor) => (
                          <Text
                            key={item.id + flavor}
                            className="text-yellow-800"
                          >
                            {flavor}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                  <TouchableOpacity className="bg-white rounded items-center justify-center w-20">
                    <AntDesign name="caretright" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
}
