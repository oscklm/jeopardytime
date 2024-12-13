import { Text, XStack } from "@/components/ui";
import type { EnrichedGamePlayer } from "@/convex/schema";

interface PlayerCardProps {
  player: EnrichedGamePlayer;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <XStack>
      <Text>{player.userId}</Text>
    </XStack>
  );
};
