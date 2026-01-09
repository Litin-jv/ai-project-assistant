import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Project360View } from "@/components/project/Project360View";

// Mock project data - in real app this would come from API/state
const mockProjects = [
  { 
    id: "1", 
    name: "New project 123", 
    startDate: "Jan 13",
    dueDate: "Jan 23",
    daysLeft: 14,
    teamName: "Sixth",
    teamSize: 4,
    details: "This is a sample project for demonstration purposes.",
    outcome: "Successfully complete all deliverables on time.",
    ai_agent_enabled: false 
  },
  { 
    id: "2", 
    name: "Ninth User", 
    startDate: "Feb 1",
    dueDate: "Feb 15",
    daysLeft: 10,
    teamName: "Alpha",
    teamSize: 6,
    details: "Marketing campaign project.",
    outcome: "Increase brand awareness by 25%.",
    ai_agent_enabled: true 
  },
  { 
    id: "3", 
    name: "samplee", 
    startDate: "Jan 13",
    dueDate: "Jan 23",
    daysLeft: 14,
    teamName: "Sixth",
    teamSize: 4,
    details: "Sample project details for testing.",
    outcome: "Complete all milestones successfully.",
    ai_agent_enabled: false 
  },
];

const Project360 = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projects, setProjects] = useState(mockProjects);
  
  const project = projects.find(p => p.id === projectId);

  const handleEnableAI = () => {
    if (projectId) {
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, ai_agent_enabled: true } : p
      ));
    }
  };

  if (!project) {
    return (
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">Project not found</p>
              <Link to="/" className="text-opz-blue hover:underline">
                Back to Project Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Project360View 
          project={project}
          onEnableAI={handleEnableAI}
        />
      </div>
    </div>
  );
};

export default Project360;
