import { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import { Text } from "@/components/ui";

export default function ImageUploader() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: false,
      quality: 0.5,
      base64: true,
      exif: true,
    });

    if (!result.canceled) {
      console.log("Image picked, size:", result.assets[0].fileSize);
      console.log("MIME type:", result.assets[0].mimeType);

      if (!result.assets[0].base64) {
        throw new Error("No base64 data found in the picked image");
      }

      if (!result.assets[0].mimeType) {
        throw new Error("No mime type found in the picked image");
      }

      setLoading(true);

      try {
        const uploadResponse = await uploadToConvex(result.assets[0]);
        console.log("Upload successful, storageId:", uploadResponse);

        setImage(result.assets[0]);
        return result;
      } catch (error) {
        console.error("Error in pickImage:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
    return null;
  }

  const uploadToConvex = async (asset: ImagePicker.ImagePickerAsset) => {
    try {
      const uploadUrl = `${process.env.EXPO_PUBLIC_SITE_URL}/uploadImage`;
      console.log("Uploading to:", uploadUrl);
      const blob = await fetch(asset.uri).then((res) => res.blob());

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": asset.mimeType ?? "image/jpeg",
        },
        body: blob,
      });

      console.log("Upload response:", uploadResponse);
      return uploadResponse;
    } catch (error) {
      console.error("Convex upload error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={pickImage}>
        <Text>Pick Image</Text>
      </TouchableHighlight>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
