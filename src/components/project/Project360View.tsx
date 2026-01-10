import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  ListTodo, 
  Info, 
  FileText, 
  ChevronRight,
  Plus,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnableAIAgentModal } from "./EnableAIAgentModal";
import { AITaskGenerationModal, GeneratedTask } from "./AITaskGenerationModal";
import { AddTaskModal } from "./AddTaskModal";
import { useToast } from "@/hooks/use-toast";

interface Project360Props {
  project: {
    id: string;
    name: string;
    startDate: string;
    dueDate: string;
    daysLeft: number;
    teamName: string;
    teamSize: number;
    details: string;
    outcome: string;
    ai_agent_enabled: boolean;
  };
  onEnableAI: () => void;
}

interface Task {
  id: string;
  title: string;
  category: string;
  assignee: string;
  status: number;
  dueDate: string;
  lastUpdated: string;
  generated_by_ai: boolean;
}

const initialTasks: Task[] = [
  {
    id: "TZK-493",
    title: "ljkhjghfgf",
    category: "S-Micro-Ecosystem &...",
    assignee: "User",
    status: 0,
    dueDate: "Jan 13, 2026",
    lastUpdated: "Yesterday",
    generated_by_ai: false,
  },
];

// Mock team members
const teamMembers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
];

export function Project360View({ project, onEnableAI }: Project360Props) {
  const [activeTab, setActiveTab] = useState("tasks");
  const [filter, setFilter] = useState<"not-closed" | "closed">("not-closed");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [enableAIModalOpen, setEnableAIModalOpen] = useState(false);
  const [aiTaskModalOpen, setAITaskModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const { toast } = useToast();

  const handleEnableAIConfirm = () => {
    onEnableAI();
    setEnableAIModalOpen(false);
    toast({
      title: "AI Agent enabled for this project",
      description: "You can now generate tasks using AI.",
    });
  };

  const handleAddTasks = (generatedTasks: GeneratedTask[]) => {
    const newTasks: Task[] = generatedTasks.map((t, index) => ({
      id: `AI-${Date.now()}-${index}`,
      title: t.title,
      category: "AI Generated",
      assignee: t.assignee ? teamMembers.find(m => m.id === t.assignee)?.name || "Unassigned" : "Unassigned",
      status: 0,
      dueDate: t.dueDate || "TBD",
      lastUpdated: "Just now",
      generated_by_ai: true,
    }));
    setTasks([...tasks, ...newTasks]);
    toast({
      title: `${generatedTasks.length} AI-generated tasks added to this project`,
      description: "Tasks have been added to your task list.",
    });
  };

  const handleAddManualTask = (taskData: {
    title: string;
    description: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    category: string;
    severity: number;
    publishable: boolean;
  }) => {
    const newTask: Task = {
      id: `TASK-${Date.now()}`,
      title: taskData.title,
      category: taskData.category,
      assignee: teamMembers.find(m => m.id === taskData.assignee)?.name || taskData.assignee,
      status: 0,
      dueDate: new Date(taskData.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUpdated: "Just now",
      generated_by_ai: false,
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task added successfully",
      description: `"${taskData.title}" has been added to your task list.`,
    });
  };

  const taskSummary = {
    notStarted: tasks.filter(t => t.status === 0).length,
    inProgress: tasks.filter(t => t.status > 0 && t.status < 100).length,
    completed: tasks.filter(t => t.status === 100).length,
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <Link to="/" className="text-opz-blue hover:underline">Projects</Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-opz-yellow">{project.name}</span>
      </div>

      {/* Project Header */}
      <div className="mb-6 flex items-center gap-2">
        <FolderKanban className="h-6 w-6 text-opz-yellow" />
        <h1 className="text-xl font-semibold text-foreground">Project - {project.name}</h1>
      </div>

      {/* Summary Cards Row */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {/* Schedule Card */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-foreground">Schedule</span>
              <Calendar className="mt-2 h-5 w-5 text-opz-yellow" />
            </div>
            <div className="flex-1 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-opz-blue">📅 Start</span>
                <span className="text-foreground">{project.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-opz-coral">📅 Due</span>
                <span className="text-foreground">{project.dueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-opz-yellow">📅 Days Left</span>
                <span className="text-opz-blue">{project.daysLeft}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Card */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="mt-1 text-xs text-muted-foreground">Team</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🏔️</span>
              <div>
                <p className="font-medium text-foreground">{project.teamName}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.teamSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Summary Card */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-foreground">Task</span>
              <span className="text-sm font-medium text-foreground">Summary</span>
              <ListTodo className="mt-1 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">○ Not started</span>
                <span className="text-foreground">{taskSummary.notStarted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">○ Inprogress</span>
                <span className="text-foreground">{taskSummary.inProgress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">○ Completed</span>
                <span className="text-foreground">{taskSummary.completed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status & CTA Card */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-muted-foreground">& CTA</p>
            </div>
            <Badge variant="outline" className="border-opz-teal text-opz-teal">
              0%
            </Badge>
          </div>
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Longest Idle</span>
              <span className="text-opz-yellow">📋</span>
              <span className="bg-opz-yellow/20 px-1 text-foreground">{tasks[0]?.title || "NA"}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Most Elapsed</span>
              <span className="text-muted-foreground">📋</span>
              <span className="text-muted-foreground">NA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0">
          <TabsTrigger 
            value="info" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-opz-yellow data-[state=active]:bg-transparent px-4 py-2"
          >
            <Info className="mr-2 h-4 w-4" />
            Info
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-opz-yellow data-[state=active]:bg-transparent px-4 py-2"
          >
            <FileText className="mr-2 h-4 w-4 text-opz-yellow" />
            Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-opz-yellow data-[state=active]:bg-transparent px-4 py-2"
          >
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger 
            value="resources" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-opz-yellow data-[state=active]:bg-transparent px-4 py-2"
          >
            <FileText className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-0">
          {/* Filter Row with AI Buttons */}
          <div className="mb-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                checked={filter === "not-closed"}
                onChange={() => setFilter("not-closed")}
                className="h-4 w-4 accent-opz-blue"
              />
              <span className="text-foreground">Not Closed</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                checked={filter === "closed"}
                onChange={() => setFilter("closed")}
                className="h-4 w-4 accent-opz-blue"
              />
              <span className="text-foreground">Closed</span>
              <Badge variant="secondary" className="bg-opz-coral text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                0
              </Badge>
            </label>

            {/* Add Task Button */}
            <Button 
              onClick={() => setAddTaskModalOpen(true)}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <FileText className="h-4 w-4" />
              Add Task
            </Button>

            {/* AI Buttons - Only visible in Tasks tab */}
            {!project.ai_agent_enabled ? (
              <Button 
                variant="outline"
                onClick={() => setEnableAIModalOpen(true)}
                className="gap-2 border-opz-blue text-opz-blue hover:bg-opz-blue/10"
              >
                <Sparkles className="h-4 w-4" />
                Add AI Agent
              </Button>
            ) : (
              <Button 
                onClick={() => setAITaskModalOpen(true)}
                className="gap-2 bg-opz-yellow text-foreground hover:bg-opz-yellow/90"
              >
                <Sparkles className="h-4 w-4" />
                Generate Tasks
              </Button>
            )}
          </div>

          {/* Task Table Header */}
          <div className="mb-2 grid grid-cols-[auto,1fr,1fr,auto,1fr,1fr,1fr,auto] items-center gap-4 px-4 text-sm text-muted-foreground">
            <input type="checkbox" className="h-4 w-4" />
            <div className="relative">
              <Input
                placeholder="Search Task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pr-8"
              />
              <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1">
              Category <Filter className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" /> <Filter className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1">
              Status <Filter className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1">
              Due ↕↑
            </div>
            <span>Last Updated</span>
            <span></span>
          </div>

          {/* Task Rows */}
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div 
                key={task.id}
                className="grid grid-cols-[auto,1fr,1fr,auto,1fr,1fr,1fr,auto] items-center gap-4 rounded-lg border border-border bg-card px-4 py-3"
              >
                <input type="checkbox" className="h-4 w-4" />
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground">ID : {task.id}</p>
                  </div>
                </div>
                <Badge className="w-fit bg-opz-blue/20 text-opz-blue border-opz-blue">
                  {task.category}
                </Badge>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                  <span className="text-xs text-white">👤</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div 
                      className="h-2 rounded-full bg-opz-teal" 
                      style={{ width: `${task.status}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{task.status}%</span>
                </div>
                <span className="text-sm text-foreground">{task.dueDate}</span>
                <span className="text-sm text-muted-foreground">{task.lastUpdated}</span>
                <button className="flex items-center gap-1 text-sm font-medium text-opz-blue hover:underline">
                  View
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="info">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Project Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Details</p>
                <p className="text-foreground">{project.details}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outcome</p>
                <p className="text-foreground">{project.outcome}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Team Members</h3>
            <p className="text-muted-foreground">Team: {project.teamName} ({project.teamSize} members)</p>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Resources</h3>
            <p className="text-muted-foreground">No resources added yet.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
        <a href="#" className="hover:text-opz-blue">Privacy policy</a>
        <a href="#" className="hover:text-opz-blue">Terms of service</a>
        <a href="#" className="hover:text-opz-blue">Contact Us: 💬</a>
      </footer>

      {/* Modals */}
      <EnableAIAgentModal
        open={enableAIModalOpen}
        onOpenChange={setEnableAIModalOpen}
        onConfirm={handleEnableAIConfirm}
      />

      <AITaskGenerationModal
        open={aiTaskModalOpen}
        onOpenChange={setAITaskModalOpen}
        projectName={project.name}
        projectDetails={project.details}
        projectOutcome={project.outcome}
        teamMembers={teamMembers}
        onAddTasks={handleAddTasks}
      />

      <AddTaskModal
        open={addTaskModalOpen}
        onOpenChange={setAddTaskModalOpen}
        projectName={project.name}
        teamMembers={teamMembers}
        onAddTask={handleAddManualTask}
      />
    </div>
  );
}
