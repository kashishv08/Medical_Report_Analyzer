import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const toastStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    borderRadius: "12px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    color: "#000000b3",
    backgroundColor:
      "color-mix(in oklab, hsl(var(--primary)) 10%, transparent)", // translucent white
    borderTopRightRadius: "2px solid #000000b3",
    border: "1px solid #000000b3",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  const iconStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
    flexShrink: 0,
    color: "#000000b3",
  };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      toastOptions={{
        style: toastStyle,
      }}
      icons={{
        success: <CircleCheckIcon style={iconStyle} />,
        info: <InfoIcon style={iconStyle} />,
        warning: <TriangleAlertIcon style={iconStyle} />,
        error: <OctagonXIcon style={iconStyle} />,
        loading: (
          <Loader2Icon
            style={{
              ...iconStyle,
              animation: "spin 1s linear infinite",
              color: "#A78BFA", // purple for loading
            }}
          />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
