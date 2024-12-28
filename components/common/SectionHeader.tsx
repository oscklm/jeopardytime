import { StyleSheet } from "react-native-unistyles";
import { type IconNames, Icons, Text, XStack, YStack } from "@/components/ui";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: IconNames;
};

export const SectionHeader = ({
  title,
  subtitle,
  icon,
}: SectionHeaderProps): React.JSX.Element => {
  const Icon = icon ? Icons[icon] : null;

  return (
    <XStack ai="center" gap="sm">
      <YStack gap="none">
        <XStack ai="center" gap="sm">
          {Icon && (
            <Icon size={20} strokeWidth={2.5} color={styles.iconColor.color} />
          )}
          <Text variant="h2" style={styles.titleText}>
            {title}
          </Text>
        </XStack>
        {subtitle && (
          <Text variant="caption" muted>
            {subtitle}
          </Text>
        )}
      </YStack>
    </XStack>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
  },
  iconColor: {
    color: th.colors.foreground.base,
  },
  titleText: {
    fontFamily: th.fontFamily.HeadingBlack,
  },
}));
