import { TrendingUp, Users, FileText, ListTodo, Clock } from "lucide-react";

interface SummaryCardProps {
  title: string;
  items: { label: string; value: number | string; color?: string }[];
  icon?: React.ReactNode;
}

function SummaryCard({ title, items, icon }: SummaryCardProps) {
  return (
    <div className="flex min-w-[180px] items-center gap-4 rounded-lg border border-border bg-card p-4">
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="flex-1">
        <p className="mb-2 text-sm font-medium text-foreground">{title}</p>
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className={item.color || "text-foreground"}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SummaryCards() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Team Card */}
      <div className="flex min-w-[160px] items-center gap-6 rounded-lg border border-border bg-card px-6 py-4">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium text-foreground">Team</p>
          <TrendingUp className="mx-auto h-5 w-5 text-muted-foreground" />
        </div>
        <div className="border-l border-border pl-6">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">10</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">18</span>
          </div>
        </div>
      </div>

      {/* Project Summary Card */}
      <div className="flex min-w-[200px] items-center gap-4 rounded-lg border border-border bg-card px-6 py-4">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Project</p>
          <p className="text-sm font-medium text-foreground">Summary</p>
          <ListTodo className="mt-1 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="border-l border-border pl-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
            <span className="text-muted-foreground">Not started</span>
            <span className="ml-auto text-foreground">42</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-opz-yellow"></span>
            <span className="text-muted-foreground">Inprogress</span>
            <span className="ml-auto text-foreground">21</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-opz-green"></span>
            <span className="text-muted-foreground">Completed</span>
            <span className="ml-auto text-foreground">0</span>
          </div>
        </div>
      </div>

      {/* Task Summary Card */}
      <div className="flex min-w-[200px] items-center gap-4 rounded-lg border border-border bg-card px-6 py-4">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Task</p>
          <p className="text-sm font-medium text-foreground">Summary</p>
          <ListTodo className="mt-1 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="border-l border-border pl-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
            <span className="text-muted-foreground">Not started</span>
            <span className="ml-auto text-foreground">126</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-opz-yellow"></span>
            <span className="text-muted-foreground">Inprogress</span>
            <span className="ml-auto text-foreground">53</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-opz-green"></span>
            <span className="text-muted-foreground">Completed</span>
            <span className="ml-auto text-foreground">20</span>
          </div>
        </div>
      </div>

      {/* Call to Action Card */}
      <div className="flex min-w-[200px] flex-col rounded-lg border border-border bg-card px-6 py-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Call to Action</p>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Most Elapsed</span>
            <FileText className="h-4 w-4 text-opz-yellow" />
            <span className="text-muted-foreground">without ...</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Longest Idle</span>
            <FileText className="h-4 w-4 text-opz-yellow" />
            <span className="text-muted-foreground">without fi...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
