import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Bot, 
  Sliders, 
  Shield, 
  Zap,
  ChevronRight,
  Save,
  RotateCcw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ConfigSection {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const configSections: ConfigSection[] = [
  { id: "model", name: "Model Selection", icon: Bot, description: "Choose AI model and version" },
  { id: "prompts", name: "Prompt Templates", icon: Sliders, description: "Customize agent prompts" },
  { id: "parameters", name: "Parameters", icon: Zap, description: "Temperature, tokens, limits" },
  { id: "safety", name: "Safety & Guardrails", icon: Shield, description: "Configure safety rules" },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("model");
  const { toast } = useToast();
  
  // Model Selection State
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [modelVersion, setModelVersion] = useState("latest");
  
  // Parameters State
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState([0.9]);
  
  // Prompt Templates State
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an AI Project Manager agent for opzHIVE. Your role is to help manage tasks, generate reports, and assist with project coordination. Always be helpful, accurate, and transparent in your reasoning."
  );
  const [taskGenerationPrompt, setTaskGenerationPrompt] = useState(
    "Based on the project context and goals, generate actionable tasks with clear descriptions, priorities, and suggested assignees."
  );
  
  // Safety State
  const [enableGuardrails, setEnableGuardrails] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [maxActionsPerDay, setMaxActionsPerDay] = useState(50);
  const [blockSensitiveData, setBlockSensitiveData] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Agent configuration has been updated successfully.",
    });
  };

  const handleReset = () => {
    // Reset to defaults based on active section
    toast({
      title: "Settings reset",
      description: "Configuration has been reset to defaults.",
    });
  };

  const renderConfigPanel = () => {
    switch (activeSection) {
      case "model":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="model">AI Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select the AI model to power the PM Agent
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="version">Model Version</Label>
              <Select value={modelVersion} onValueChange={setModelVersion}>
                <SelectTrigger id="version">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="preview">Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Model Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Context Window: 128K tokens</p>
                <p>• Training Cutoff: Jan 2024</p>
                <p>• Best for: Complex reasoning, task planning</p>
              </div>
            </div>
          </div>
        );
        
      case "prompts":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">System Prompt</Label>
              <Textarea
                id="system-prompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="min-h-[120px]"
                placeholder="Enter the system prompt for the agent..."
              />
              <p className="text-xs text-muted-foreground">
                This prompt defines the agent's base behavior and personality
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-prompt">Task Generation Prompt</Label>
              <Textarea
                id="task-prompt"
                value={taskGenerationPrompt}
                onChange={(e) => setTaskGenerationPrompt(e.target.value)}
                className="min-h-[100px]"
                placeholder="Enter the task generation prompt..."
              />
              <p className="text-xs text-muted-foreground">
                Template used when generating new tasks
              </p>
            </div>
          </div>
        );
        
      case "parameters":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="text-sm text-muted-foreground">{temperature[0]}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls randomness. Lower = more focused, Higher = more creative
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <Input
                id="max-tokens"
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                min={256}
                max={4096}
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of tokens in the response (256-4096)
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Top P (Nucleus Sampling)</Label>
                <span className="text-sm text-muted-foreground">{topP[0]}</span>
              </div>
              <Slider
                value={topP}
                onValueChange={setTopP}
                max={1}
                step={0.05}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls diversity via nucleus sampling
              </p>
            </div>
          </div>
        );
        
      case "safety":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Guardrails</Label>
                <p className="text-xs text-muted-foreground">
                  Apply safety filters to agent outputs
                </p>
              </div>
              <Switch
                checked={enableGuardrails}
                onCheckedChange={setEnableGuardrails}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Human Approval</Label>
                <p className="text-xs text-muted-foreground">
                  All agent actions require manual approval
                </p>
              </div>
              <Switch
                checked={requireApproval}
                onCheckedChange={setRequireApproval}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Block Sensitive Data</Label>
                <p className="text-xs text-muted-foreground">
                  Prevent agent from processing PII/sensitive info
                </p>
              </div>
              <Switch
                checked={blockSensitiveData}
                onCheckedChange={setBlockSensitiveData}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="max-actions">Max Actions Per Day</Label>
              <Input
                id="max-actions"
                type="number"
                value={maxActionsPerDay}
                onChange={(e) => setMaxActionsPerDay(parseInt(e.target.value))}
                min={1}
                max={500}
              />
              <p className="text-xs text-muted-foreground">
                Limit the number of autonomous actions per day
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Settings</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-opz-yellow">Agent Configuration</span>
          </div>

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">Agent Configuration</h1>
            <p className="text-sm text-muted-foreground">
              Configure AI model settings, prompts, and safety parameters for the PM Agent
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-[280px,1fr] gap-6">
            {/* Left Column - Categories */}
            <Card className="border-border h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Configuration Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1 p-2">
                  {configSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-opz-yellow/20 text-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <section.icon className={`h-4 w-4 ${activeSection === section.id ? "text-opz-yellow" : ""}`} />
                      <div>
                        <p className="font-medium">{section.name}</p>
                        <p className="text-xs text-muted-foreground">{section.description}</p>
                      </div>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Right Column - Configuration Panel */}
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">
                    {configSections.find(s => s.id === activeSection)?.name}
                  </CardTitle>
                  <CardDescription>
                    {configSections.find(s => s.id === activeSection)?.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={handleSave} className="gap-1 bg-opz-yellow text-foreground hover:bg-opz-yellow/90">
                    <Save className="h-3 w-3" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderConfigPanel()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
