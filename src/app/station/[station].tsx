import { api } from "@/api";
import { EmptyOrderDetails, IOrderDetails } from "@/interfaces/IOrderDetails";
import { Header } from "@/ui/components/header";
import clsx from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

type TypeState = "INICIAR" | "FINALIZAR";

export default function Station() {
  const { station } = useLocalSearchParams();
  const [stationName, setStationName] = useState("");
  const [order, setOrder] = useState<IOrderDetails>(new EmptyOrderDetails());
  const [state, setState] = useState<TypeState>("INICIAR");

  const buttonStyle = clsx(
    "flex-1 m-8 h-full rounded-xl justify-center items-center",
    {
      "bg-green-600": state == "INICIAR",
      "bg-red-600": state == "FINALIZAR",
    }
  );

  useEffect(() => {
    getNextOrder();
  }, []);

  const getNextOrder = () => {
    api.get(`order/${station}/next`).then((res) => {
      setStationName(res.data.name);
      if (res.data.nextOrder != null) {
        setOrder(res.data.nextOrder);
        const report = res.data.nextOrder.startEndReports.find(
          (x) => x.stationId == station
        );

        if (report?.startedAt != undefined) setState("FINALIZAR");
      }
    });
  };

  const handleState = () => {
    if (state == "INICIAR") {
      api.put(`order/${order.id}/start`).then((res) => {
        setState("FINALIZAR");
      });
    } else if (state == "FINALIZAR") {
      api.put(`order/${order.id}/end`).then(() => {
        getNextOrder();
        setState("INICIAR");
      });
    }
  };

  return (
    <>
      <Header title={stationName} />
      <SafeAreaView className="flex-row">
        <View className="m-8 gap-4 flex-1 justify-center">
          <Text className="text-black font-bold text-3xl">{order?.title}</Text>
          <View>
            {order.flavors.map((flavor) => (
              <Text key={order.id + flavor} className="text-xl">
                {flavor}
              </Text>
            ))}
          </View>

          {order.doughType && (
            <Text className="text-xl">Massa: {order.doughType}</Text>
          )}

          {order.observation.length > 0 && (
            <View className="bg-yellow-200 px-2 py-1 rounded">
              {order.observation.map((flavor) => (
                <Text key={order.id + flavor} className="text-yellow-800">
                  {flavor}
                </Text>
              ))}
            </View>
          )}
        </View>
        <Pressable className={buttonStyle} onPress={handleState}>
          <Text className="font-bold text-white text-6xl uppercase">
            {state}
          </Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}
