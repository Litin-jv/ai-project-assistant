import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProjectBoard } from "@/components/project/ProjectBoard";

const Index = () => {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ProjectBoard />
      </div>
    </div>
  );
};

export default Index;
