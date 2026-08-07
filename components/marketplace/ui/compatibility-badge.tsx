import { CheckCircle2, CircleAlert, CircleHelp, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { bandTone } from "@/lib/marketplace/fitment";
import type { FitmentResult } from "@/lib/marketplace/types";

const ICONS = {
  success: CheckCircle2,
  accent: CircleHelp,
  warning: CircleAlert,
  racing: XCircle,
};

export function CompatibilityBadge({ result }: { result: FitmentResult }) {
  const tone = bandTone(result.band);
  const Icon = ICONS[tone];
  return (
    <Badge variant={tone}>
      <Icon className="h-3 w-3" />
      {result.label}
    </Badge>
  );
}
