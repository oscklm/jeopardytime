import { Icons, Text, XStack, YStack } from "@/components/ui";

import { StyleSheet } from "react-native-unistyles";
import * as ExpoImagePicker from "expo-image-picker";
import { useState } from "react";
import { TouchableHighlight } from "react-native";

interface ImagePickerProps {
  onPick: (file: Blob) => void;
}

async function blobFromImagePickerResult(
  result: ExpoImagePicker.ImagePickerSuccessResult
): Promise<Blob> {
  const asset = result.assets[0];
  const response = await fetch(asset.uri);
  const blob = await response.blob();

  return blob;
}

async function pickImage(
  options: ExpoImagePicker.ImagePickerOptions
): Promise<ExpoImagePicker.ImagePickerSuccessResult | null> {
  console.log("launching image picker");

  const result = await ExpoImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    ...options,
    allowsMultipleSelection: false,
    quality: 0.7,
    base64: true,
    exif: false,
  });

  if (!result.canceled) {
    return result;
  }
  return null;
}

export default function ImagePicker({ onPick }: ImagePickerProps) {
  const [result, setResult] =
    useState<ExpoImagePicker.ImagePickerSuccessResult | null>(null);

  const pickImageWithResults = async (
    options: ExpoImagePicker.ImagePickerOptions
  ) => {
    const result = await pickImage(options);

    if (result) {
      setResult(result);
      const blob = await blobFromImagePickerResult(result);
      onPick(blob);
    }
  };

  return (
    <YStack>
      <TouchableHighlight onPress={() => pickImageWithResults({})}>
        <XStack ai="center" gap="sm">
          <Icons.images size={24} />
          <Text>Pick an image</Text>
          {result && <Text>{result.assets[0].fileName}</Text>}
        </XStack>
      </TouchableHighlight>
    </YStack>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
}));
