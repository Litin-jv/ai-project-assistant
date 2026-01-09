import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Default", value: 35, color: "#F8B4B4" },
  { name: "new", value: 25, color: "#60A5FA" },
  { name: "test 100", value: 25, color: "#F87171" },
  { name: "Others", value: 15, color: "#FCD34D" },
];

export function TasksChart() {
  return (
    <div className="w-[320px] rounded-lg border border-border bg-card p-4">
      {/* Tabs */}
      <div className="mb-4 flex gap-4 border-b border-border">
        <button className="border-b-2 border-foreground pb-2 text-sm font-medium text-foreground">
          Tasks by category
        </button>
        <button className="pb-2 text-sm text-muted-foreground hover:text-foreground">
          Projects by Teams
        </button>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs">
            <span 
              className="h-2.5 w-2.5 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
