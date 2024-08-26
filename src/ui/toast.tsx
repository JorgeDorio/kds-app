import clsx from "clsx";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Text, View } from "react-native";

type type = "success" | "error" | "alert";

interface IToastProps {
  visible: boolean;
  message: string;
  type: type;
}

function Toast({ visible, message, type }: IToastProps) {
  if (!visible) return null;

  const boxStyle = clsx("absolute right-8 bottom-8 px-8 py-4 rounded-lg", {
    "bg-red-200": type == "error",
    "bg-yellow-200": type == "alert",
    "bg-green-200": type == "success",
  });

  const textStyle = clsx("font-bold", {
    "text-red-800": type == "error",
    "text-yellow-800": type == "alert",
    "text-green-800": type == "success",
  });

  return (
    <View className={boxStyle}>
      <Text className={textStyle}>{message}</Text>
    </View>
  );
}

const ToastContext = createContext(
  {} as {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setType: React.Dispatch<React.SetStateAction<type>>;
  }
);

export function ToastContextContainer({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<type>("success");

  return (
    <ToastContext.Provider
      value={{ show, setShow, message, setMessage, setType }}
    >
      {children}
      <Toast visible={show} message={message} type={type} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const { setShow, setMessage, setType } = useContext(ToastContext);

  const success = (message: string) => {
    setMessage(message);
    setType("success");
    setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  const error = (message: string) => {
    setMessage(message);
    setType("error");
    setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  const alert = (message: string) => {
    setMessage(message);
    setType("alert");
    setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  return { success, alert, error };
}
