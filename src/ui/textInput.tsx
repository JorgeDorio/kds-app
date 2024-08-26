import { TextInput as Input, KeyboardTypeOptions } from "react-native";

interface ITextInputProps {
  placeholder: string;
  password?: boolean;
  onChangeText?: (text: string, id: string) => void;
  id?: string;
  value?: string;
  type?: KeyboardTypeOptions;
}

export function TextInput({
  placeholder,
  password,
  onChangeText,
  id,
  value,
  type,
}: ITextInputProps) {
  return (
    <Input
      placeholder={placeholder}
      className="px-4 py-2 rounded border"
      secureTextEntry={password}
      onChangeText={(text) => onChangeText(text, id)}
      keyboardType={type}
      value={value}
    />
  );
}
