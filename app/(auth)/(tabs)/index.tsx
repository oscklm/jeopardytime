import { XStack } from "@/components/ui";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header - using styles directly onto view and text from react-native */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.text}>Left</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.text}>Right</Text>
        </View>
      </View>
      {/* XSTACK THAT USES PROPS THAT RESOLVE TO VARAIANTS */}
      <View style={{ backgroundColor: "pink" }}>
        <XStack padding="md">
          <XStack>
            <Text style={styles.text}>Left</Text>
          </XStack>
          <XStack>
            <Text style={styles.text}>Right</Text>
          </XStack>
        </XStack>
      </View>
      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.text}>card</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    padding: th.gap(4),
    backgroundColor: "yellow",
  },
  headerContainer: {
    padding: th.gap(4),
    backgroundColor: "cyan",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    backgroundColor: "blue",
  },
  headerRight: {
    backgroundColor: "green",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  card: {
    backgroundColor: "purple",
  },
}));

// import { ScrollView, TouchableOpacity, View } from "react-native";
// import { router } from "expo-router";
// import { StyleSheet } from "react-native-unistyles";

// import {
//   Button,
//   Text,
//   Card,
//   Spacer,
//   YStack,
//   XStack,
//   Icons,
// } from "@/components/ui";

// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

// import { formatDistanceToNow } from "date-fns";
// import { useEffect } from "react";

// export default function HomeScreen() {
//   const gameRooms = useQuery(api.games.getAllGameRooms);

//   useEffect(() => {
//     console.log("Home mounted");
//     return () => {
//       console.log("Home unmounted");
//     };
//   }, []);
//   if (gameRooms === undefined) return null;

//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <XStack ai="center" jc="spaceBetween">
//           <XStack ai="center" gap="md">
//             <Icons.logo size={28} color={styles.logo.color} />
//             <Text variant="h1">
//               Rooms <Text muted>({gameRooms.length})</Text>
//             </Text>
//           </XStack>
//           <XStack gap="md">
//             <Button size="sm" onPress={() => router.push("/rooms/create")}>
//               <Icons.plus size={20} color="white" />
//             </Button>
//           </XStack>
//         </XStack>
//         <Spacer />
//         <YStack gap="lg">
//           {gameRooms.map((game) => (
//             <TouchableOpacity
//               key={game._id}
//               onPress={() => router.push(`/rooms/${game._id}`)}
//             >
//               <Card key={game._id}>
//                 <View>
//                   <XStack ai="center" jc="spaceBetween">
//                     <Text variant="h2">{game.name}</Text>
//                     <View style={styles.badge}>
//                       <Text style={styles.badgeText}>
//                         {game.maxPlayers} players
//                       </Text>
//                     </View>
//                   </XStack>
//                   <Text variant="caption" muted>
//                     {formatDistanceToNow(game._creationTime)} •{" "}
//                     {game.maxPlayers} players
//                   </Text>
//                   <Text muted>{game.code}</Text>
//                 </View>
//               </Card>
//             </TouchableOpacity>
//           ))}
//         </YStack>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create((th, rt) => ({
//   container: {
//     flex: 1,
//     padding: th.gap(3),
//   },
//   logo: {
//     color: th.colors.primary.base,
//   },
//   badge: {
//     backgroundColor: th.colors.primary.base,
//     padding: th.gap(1),
//     paddingHorizontal: th.gap(3),
//     borderRadius: th.borderRadius(4),
//   },
//   badgeText: {
//     fontFamily: th.fontFamily.HeadingBlack,
//     fontSize: th.fontSize(0.825),
//     lineHeight: th.fontSize(0.825) * 1.3,
//     color: th.colors.background.light,
//   },
// }));
