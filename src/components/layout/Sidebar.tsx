import { useState } from "react";
import { 
  Home, 
  FolderKanban, 
  LayoutGrid, 
  Users, 
  Briefcase, 
  Users2, 
  Store, 
  CheckCircle2, 
  Building2, 
  FileBarChart,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  subItems?: { label: string; active?: boolean }[];
}

const navItems: NavItem[] = [
  { icon: Home, label: "Task Home" },
  { 
    icon: FolderKanban, 
    label: "My Projects",
    subItems: [
      { label: "Scrum", active: true },
      { label: "Kanban" }
    ]
  },
  { icon: Users, label: "My Teams" },
  { icon: Briefcase, label: "My Portfolio" },
  { icon: Users2, label: "My Team Portfolio" },
  { icon: Store, label: "Task Marketplace" },
  { icon: CheckCircle2, label: "Approvals", badge: 2 },
  { icon: Building2, label: "My Office Space" },
  { icon: FileBarChart, label: "Ops Reports" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="relative flex h-full w-[200px] flex-col border-r border-border bg-card">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-opz-yellow shadow-sm"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item, index) => (
          <div key={index}>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-opz-coral text-xs text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </button>
            {item.subItems && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((sub, subIndex) => (
                  <button
                    key={subIndex}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      sub.active
                        ? "bg-opz-yellow-light text-foreground font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
