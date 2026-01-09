import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, ExternalLink, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: string;
  name: string;
  dueTime: string;
  status: "Not started" | "In progress" | "Completed";
  ai_agent_enabled: boolean;
}

interface ProjectTableProps {
  projects: Project[];
  onAddProject: () => void;
}

export function ProjectTable({ projects, onAddProject }: ProjectTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"not-closed" | "closed">("not-closed");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="flex-1">
      {/* Filter and Add Button */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
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
              8
            </Badge>
          </label>
        </div>
        <Button 
          onClick={onAddProject}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-xs">
        <Input
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      {/* Table Header */}
      <div className="mb-2 grid grid-cols-[1fr,120px,120px,140px] gap-4 px-4 text-sm font-medium text-muted-foreground">
        <span></span>
        <span className="flex items-center gap-1">Due ↕</span>
        <span className="flex items-center gap-1">Status ▼</span>
        <span></span>
      </div>

      {/* Table Body */}
      <div className="space-y-2">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            className="grid grid-cols-[1fr,120px,120px,140px] items-center gap-4 rounded-lg border border-border bg-card px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-opz-yellow" />
              <span className="text-sm font-medium text-foreground">{project.name}</span>
            </div>
            <span className="text-sm text-opz-coral">{project.dueTime}</span>
            <Badge 
              variant="outline" 
              className="w-fit border-opz-coral bg-opz-coral-light text-opz-coral"
            >
              {project.status}
            </Badge>
            <button 
              onClick={() => handleViewProject(project.id)}
              className="flex items-center gap-1 text-sm font-medium text-opz-blue hover:underline"
            >
              View
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground">«</button>
        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
              currentPage === page 
                ? "bg-opz-blue text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="text-muted-foreground">...</span>
        <button className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-muted-foreground hover:bg-muted">
          16
        </button>
        <button className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground">»</button>
      </div>

    </div>
  );
}
