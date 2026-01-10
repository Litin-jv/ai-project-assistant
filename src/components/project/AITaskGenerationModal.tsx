import { useState } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface GeneratedTask {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  category: string;
  assignee?: string;
  selected: boolean;
  generated_by_ai: boolean;
}

const categories = [
  "S-Micro-Ecosystem",
  "Development",
  "Design",
  "Planning",
  "Review",
  "Testing",
];

interface AITaskGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  projectDetails: string;
  projectOutcome: string;
  teamMembers: { id: string; name: string }[];
  onAddTasks: (tasks: GeneratedTask[]) => void;
}

export function AITaskGenerationModal({
  open,
  onOpenChange,
  projectName,
  projectDetails,
  projectOutcome,
  teamMembers,
  onAddTasks,
}: AITaskGenerationModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState<GeneratedTask[]>([]);

  const generateTasks = async () => {
    setIsGenerating(true);
    // Simulated AI task generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const mockTasks: GeneratedTask[] = [
      {
        id: "1",
        title: `Define project scope for ${projectName}`,
        description: "Create detailed project scope document outlining deliverables, timeline, and resources",
        dueDate: "",
        priority: "high",
        category: "Planning",
        assignee: "",
        selected: false,
        generated_by_ai: true,
      },
      {
        id: "2",
        title: "Set up project infrastructure",
        description: "Configure development environment, repositories, and CI/CD pipelines",
        dueDate: "",
        priority: "high",
        category: "Development",
        assignee: "",
        selected: false,
        generated_by_ai: true,
      },
      {
        id: "3",
        title: "Create initial project plan",
        description: "Develop comprehensive project plan with milestones and task breakdown",
        dueDate: "",
        priority: "medium",
        category: "Planning",
        assignee: "",
        selected: false,
        generated_by_ai: true,
      },
      {
        id: "4",
        title: "Stakeholder alignment meeting",
        description: "Schedule and conduct kickoff meeting with all stakeholders",
        dueDate: "",
        priority: "medium",
        category: "Review",
        assignee: "",
        selected: false,
        generated_by_ai: true,
      },
      {
        id: "5",
        title: "Risk assessment",
        description: "Identify potential risks and create mitigation strategies",
        dueDate: "",
        priority: "low",
        category: "Planning",
        assignee: "",
        selected: false,
        generated_by_ai: true,
      },
    ];
    
    setTasks(mockTasks);
    setIsGenerating(false);
  };

  const toggleTaskSelection = (taskId: string) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, selected: !task.selected } : task
    ));
  };

  const updateTask = (taskId: string, field: keyof GeneratedTask, value: string) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, [field]: value } : task
    ));
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddSelected = () => {
    const selectedTasks = tasks.filter((task) => task.selected);
    onAddTasks(selectedTasks);
    setTasks([]);
    onOpenChange(false);
  };

  const selectedCount = tasks.filter((t) => t.selected).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="h-5 w-5 text-opz-yellow" />
            AI-Generated Tasks
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4">
          {tasks.length === 0 && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-8">
              <Sparkles className="mb-4 h-12 w-12 text-opz-yellow" />
              <p className="mb-4 text-center text-muted-foreground">
                Generate tasks based on your project details using AI
              </p>
              <Button
                onClick={generateTasks}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Sparkles className="h-4 w-4" />
                Generate Tasks
              </Button>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-opz-yellow" />
              <p className="text-center text-muted-foreground">Generating tasks...</p>
            </div>
          )}

          {tasks.length > 0 && !isGenerating && (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-border bg-muted/20 p-4"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      checked={task.selected}
                      onCheckedChange={() => toggleTaskSelection(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Input
                        value={task.title}
                        onChange={(e) => updateTask(task.id, "title", e.target.value)}
                        className="mb-2 border-border font-medium"
                      />
                      <Textarea
                        value={task.description}
                        onChange={(e) => updateTask(task.id, "description", e.target.value)}
                        className="mb-2 min-h-[60px] border-border text-sm resize-none"
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <Input
                          type="date"
                          placeholder="Due date"
                          value={task.dueDate || ""}
                          onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
                          className="w-40 border-border text-sm"
                        />
                        <Select
                          value={task.priority}
                          onValueChange={(v) => updateTask(task.id, "priority", v)}
                        >
                          <SelectTrigger className="w-32 border-border text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={task.category}
                          onValueChange={(v) => updateTask(task.id, "category", v)}
                        >
                          <SelectTrigger className="w-40 border-border text-sm">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={task.assignee || ""}
                          onValueChange={(v) => updateTask(task.id, "assignee", v)}
                        >
                          <SelectTrigger className="w-40 border-border text-sm">
                            <SelectValue placeholder="Assignee" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            {teamMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {tasks.length > 0 && (
          <DialogFooter className="border-t border-border px-6 py-4">
            <Button
              onClick={handleAddSelected}
              disabled={selectedCount === 0}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Selected Tasks ({selectedCount})
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
