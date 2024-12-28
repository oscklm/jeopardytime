import { StyleSheet } from "react-native-unistyles";
import { Text } from "@/components/ui";
import { Badge } from "@/components/ui/Badge";

type PublicStatusIndicatorProps = {
  isPublic: boolean;
};

export const PublicStatusIndicator = ({
  isPublic,
}: PublicStatusIndicatorProps): React.JSX.Element => {
  return (
    <Badge variant="primary">
      <Text variant="subtitle" color="inverted">
        {isPublic ? "Public" : "Private"}
      </Text>
    </Badge>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
}));
