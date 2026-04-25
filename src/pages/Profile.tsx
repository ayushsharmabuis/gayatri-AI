import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Clock, MapPin, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChartCard from "@/components/ChartCard";
import { loadChart, type VedicChart } from "@/lib/astrology";

const Profile = () => {
  const [chart, setChart] = useState<VedicChart | null>(null);
  useEffect(() => setChart(loadChart()), []);

  return (
    <div className="min-h-[100dvh] bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to chat
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-saffron flex items-center justify-center shadow-lg shadow-saffron/30">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Your Profile</h1>
            <p className="text-sm text-muted-foreground">Birth details power every reading</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-saffron" /> Birth Details
            </h2>
            {chart ? (
              <div className="space-y-3 text-sm">
                <Row icon={Calendar} label="Date of birth" value={chart.birth.date} />
                <Row icon={Clock} label="Time of birth" value={`${chart.birth.time} (UTC${chart.birth.tzOffsetHours >= 0 ? "+" : ""}${chart.birth.tzOffsetHours})`} />
                <Row icon={MapPin} label="Place" value={chart.birth.place} />
                <Row icon={User} label="Gender" value={chart.birth.gender ?? "—"} />
                <Link to="/onboarding" className="block pt-2">
                  <Button variant="outline" size="sm" className="border-saffron/40 text-saffron w-full">
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Recalculate chart
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-3">No chart yet.</p>
                <Link to="/onboarding"><Button size="sm" className="gradient-saffron text-primary-foreground">Generate now</Button></Link>
              </div>
            )}
          </div>

          {chart && <ChartCard chart={chart} />}
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0">
    <span className="flex items-center gap-2 text-muted-foreground">
      <Icon className="w-3.5 h-3.5 text-saffron" />
      {label}
    </span>
    <span className="text-foreground font-medium text-right">{value}</span>
  </div>
);

export default Profile;
