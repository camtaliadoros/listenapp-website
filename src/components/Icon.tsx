import {
  IconAlertTriangle,
  IconMicrophone,
  IconPhoneCall,
  IconMessageCircle,
  IconDeviceMobile,
  IconHeart,
  IconLock,
  IconBuildingCommunity,
  IconRefresh,
  IconAccessible,
  IconWorld,
  IconBolt,
  IconFileText,
  IconEyeOff,
  type IconProps,
} from "@tabler/icons-react";

const ICONS: Record<string, React.ComponentType<IconProps>> = {
  "ti-alert-triangle": IconAlertTriangle,
  "ti-microphone": IconMicrophone,
  "ti-phone-call": IconPhoneCall,
  "ti-message-circle": IconMessageCircle,
  "ti-device-mobile": IconDeviceMobile,
  "ti-heart": IconHeart,
  "ti-lock": IconLock,
  "ti-building-community": IconBuildingCommunity,
  "ti-refresh": IconRefresh,
  "ti-accessible": IconAccessible,
  "ti-world": IconWorld,
  "ti-bolt": IconBolt,
  "ti-file-text": IconFileText,
  "ti-eye-off": IconEyeOff,
};

export default function Icon({ name, ...props }: { name?: string } & IconProps) {
  const Component = name ? ICONS[name] : undefined;
  if (!Component) return null;
  return <Component {...props} />;
}
