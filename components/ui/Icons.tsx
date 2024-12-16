import {
  Moon,
  SunMedium,
  type Icon as LucideIcon,
  PartyPopper,
  List,
  House,
  User,
  Plus,
  Copy,
  Images,
  ChevronLeft,
  MessageCircleQuestion,
  Shapes,
  Info,
  Stars,
} from "lucide-react-native";

export type Icon = typeof LucideIcon;

export const Icons = {
  sun: SunMedium,
  list: List,
  info: Info,
  home: House,
  images: Images,
  copy: Copy,
  plus: Plus,
  category: Shapes,
  profile: User,
  star: Stars,
  question: MessageCircleQuestion,
  logo: PartyPopper,
  arrowLeft: ChevronLeft,
  moon: Moon,
};
