import { useState } from "react";
import { FolderKanban, Plus, Sparkles } from "lucide-react";
import { SummaryCards } from "./SummaryCards";
import { ProjectTable, Project } from "./ProjectTable";
import { TasksChart } from "./TasksChart";
import { NewProjectModal } from "./NewProjectModal";
import { AITaskGenerationModal, GeneratedTask } from "./AITaskGenerationModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const initialProjects: Project[] = [
  { id: "1", name: "New project 123", dueTime: "1 year ago", status: "Not started", ai_agent_enabled: false },
  { id: "2", name: "Ninth User", dueTime: "1 year ago", status: "Not started", ai_agent_enabled: true },
  { id: "3", name: "project - K", dueTime: "11 months ago", status: "Not started", ai_agent_enabled: false },
  { id: "4", name: "test", dueTime: "8 months ago", status: "Not started", ai_agent_enabled: false },
];

export function ProjectBoard() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [aiTaskModalOpen, setAITaskModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const handleCreateProject = (data: {
    name: string;
    members: string;
    startDate: string;
    dueDate: string;
    details: string;
    outcome: string;
    ai_agent_enabled: boolean;
  }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: data.name || "Untitled Project",
      dueTime: "Just now",
      status: "Not started",
      ai_agent_enabled: data.ai_agent_enabled,
    };
    setProjects([newProject, ...projects]);
    toast({
      title: "Project created successfully",
      description: data.ai_agent_enabled 
        ? "AI Agent is enabled for this project."
        : "Project has been added to your board.",
    });
  };

  const handleEnableAI = (projectId: string) => {
    setProjects(projects.map((p) =>
      p.id === projectId ? { ...p, ai_agent_enabled: true } : p
    ));
  };

  const handleViewProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleGenerateTasks = () => {
    if (selectedProject?.ai_agent_enabled) {
      setAITaskModalOpen(true);
    }
  };

  const handleAddTasks = (tasks: GeneratedTask[]) => {
    toast({
      title: `${tasks.length} tasks added successfully`,
      description: "AI-generated tasks have been added to the project.",
    });
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Breadcrumb */}
      <p className="mb-2 text-sm text-opz-blue">Projects</p>
      
      {/* Title */}
      <div className="mb-6 flex items-center gap-2">
        <FolderKanban className="h-6 w-6 text-opz-yellow" />
        <h1 className="text-xl font-semibold text-foreground">My Project Board</h1>
      </div>

      {/* Summary Cards */}
      <div className="mb-6">
        <SummaryCards />
      </div>

      {/* Task Actions (when project is selected) */}
      {selectedProject && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium text-foreground">
            Project: {selectedProject.name}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-border">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
            <Button
              size="sm"
              onClick={handleGenerateTasks}
              disabled={!selectedProject.ai_agent_enabled}
              className={`gap-2 ${
                selectedProject.ai_agent_enabled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "cursor-not-allowed opacity-50 bg-muted text-muted-foreground"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Generate Tasks
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-6">
        <ProjectTable
          projects={projects}
          onAddProject={() => setNewProjectModalOpen(true)}
          onEnableAI={handleEnableAI}
          onViewProject={handleViewProject}
        />
        <TasksChart />
      </div>

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
        <a href="#" className="hover:text-opz-blue">Privacy policy</a>
        <a href="#" className="hover:text-opz-blue">Terms of service</a>
        <a href="#" className="hover:text-opz-blue">Contact Us: 💬</a>
      </footer>

      {/* Modals */}
      <NewProjectModal
        open={newProjectModalOpen}
        onOpenChange={setNewProjectModalOpen}
        onSubmit={handleCreateProject}
      />

      {selectedProject && (
        <AITaskGenerationModal
          open={aiTaskModalOpen}
          onOpenChange={setAITaskModalOpen}
          projectName={selectedProject.name}
          projectDetails=""
          projectOutcome=""
          onAddTasks={handleAddTasks}
        />
      )}
    </div>
  );
}
