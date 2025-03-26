import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck, AlertCircle, TriangleAlert } from "lucide-react";

type AlertMessageProps = {
  message: string;
  variant: "success" | "error" | "warning";
};

function AlertMessage({ message, variant }: AlertMessageProps) {
  let Icon;
  let title;

  switch (variant) {
    case "success":
      Icon = CircleCheck;
      title = "Success";
      break;
    case "error":
      Icon = AlertCircle;
      title = "Error";
      break;
    case "warning":
      Icon = TriangleAlert;
      title = "Warning";
      break;
  }

  return (
    <Alert variant={variant === "success" ? "default" : "destructive"}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export default AlertMessage;
