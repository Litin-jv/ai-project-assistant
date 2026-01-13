import { useState } from "react";
import { 
  Bot, 
  Sparkles, 
  FileText, 
  Mail, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Filter,
  Calendar,
  User,
  Clock,
  Target,
  Link2,
  Brain
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PMAgentTabProps {
  projectId: string;
  aiAgentEnabled: boolean;
  onToggleAgent: (enabled: boolean) => void;
}

interface AgentCapability {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  subFeatures?: { id: string; name: string; enabled: boolean }[];
}

interface AgentLog {
  id: string;
  timestamp: string;
  action: string;
  taskId?: string;
  decisionContext: string;
  goalAlignment: string;
  thoughtTrace: string;
  dependencyImpact: string;
  humanInLoop: "Autonomous" | "Human Approved";
  approverName?: string;
  approverTimestamp?: string;
}

const mockLogs: AgentLog[] = [
  {
    id: "log-1",
    timestamp: "2026-01-13T10:30:00Z",
    action: "Task Created: Setup Development Environment",
    taskId: "TASK-001",
    decisionContext: "Project kickoff phase requires immediate infrastructure setup to unblock development team.",
    goalAlignment: "Milestone 1: Project Foundation - Complete infrastructure setup within first week.",
    thoughtTrace: "Analyzed project timeline → Identified critical path dependency on dev environment → Prioritized based on team availability → Selected John Doe as assignee due to DevOps expertise → Set high priority to prevent downstream delays.",
    dependencyImpact: "Blocks 5 downstream tasks including API development and frontend setup. Early completion could accelerate sprint by 2 days.",
    humanInLoop: "Autonomous",
  },
  {
    id: "log-2",
    timestamp: "2026-01-12T14:15:00Z",
    action: "Task Reassigned: Database Schema Design",
    taskId: "TASK-002",
    decisionContext: "Original assignee on leave, task approaching deadline with no progress.",
    goalAlignment: "Milestone 1: Project Foundation - Database schema required for API development.",
    thoughtTrace: "Detected task stagnation (3 days idle) → Checked assignee availability → Found original assignee on unplanned leave → Evaluated team member skills → Selected Sarah Williams (SQL expertise) → Notified stakeholders.",
    dependencyImpact: "Reassignment prevents 4-day delay in API development. Connected tasks: User Authentication, Data Models.",
    humanInLoop: "Human Approved",
    approverName: "Mike Johnson",
    approverTimestamp: "2026-01-12T14:20:00Z",
  },
  {
    id: "log-3",
    timestamp: "2026-01-11T09:00:00Z",
    action: "Weekly Report Generated",
    decisionContext: "Scheduled weekly reporting cycle - Monday 9:00 AM.",
    goalAlignment: "Stakeholder Communication: Keep all parties informed of project progress.",
    thoughtTrace: "Aggregated task completion metrics → Identified risks (2 overdue tasks) → Generated summary with recommendations → Prepared email for stakeholders list.",
    dependencyImpact: "No task dependencies. Improves stakeholder visibility and early risk detection.",
    humanInLoop: "Autonomous",
  },
];

export function PMAgentTab({ projectId, aiAgentEnabled, onToggleAgent }: PMAgentTabProps) {
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [capabilities, setCapabilities] = useState<AgentCapability[]>([
    {
      id: "task-generation",
      name: "Task Generation & Allocation",
      description: "Automatically create and assign tasks based on project context",
      enabled: true,
      subFeatures: [
        { id: "auto-create", name: "Auto-create tasks based on project context", enabled: true },
        { id: "intelligent-assign", name: "Assign tasks to team members intelligently", enabled: true },
      ],
    },
    {
      id: "weekly-reporting",
      name: "Weekly Project Reporting",
      description: "Generate and distribute automated project summaries",
      enabled: true,
      subFeatures: [
        { id: "generate-summaries", name: "Generate weekly summaries", enabled: true },
        { id: "email-reports", name: "Email reports to stakeholders automatically", enabled: false },
      ],
    },
  ]);
  const [logs] = useState<AgentLog[]>(mockLogs);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [logFilter, setLogFilter] = useState<"all" | "autonomous" | "human-approved">("all");
  const [taskIdFilter, setTaskIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleToggleChange = (checked: boolean) => {
    if (!checked && aiAgentEnabled) {
      setShowDisableDialog(true);
    } else {
      onToggleAgent(checked);
    }
  };

  const confirmDisable = () => {
    onToggleAgent(false);
    setShowDisableDialog(false);
  };

  const toggleCapability = (capId: string) => {
    if (!aiAgentEnabled) return;
    setCapabilities(prev =>
      prev.map(cap =>
        cap.id === capId ? { ...cap, enabled: !cap.enabled } : cap
      )
    );
  };

  const toggleSubFeature = (capId: string, subId: string) => {
    if (!aiAgentEnabled) return;
    setCapabilities(prev =>
      prev.map(cap =>
        cap.id === capId
          ? {
              ...cap,
              subFeatures: cap.subFeatures?.map(sub =>
                sub.id === subId ? { ...sub, enabled: !sub.enabled } : sub
              ),
            }
          : cap
      )
    );
  };

  const toggleLogExpanded = (logId: string) => {
    setExpandedLogs(prev => {
      const next = new Set(prev);
      if (next.has(logId)) {
        next.delete(logId);
      } else {
        next.add(logId);
      }
      return next;
    });
  };

  const filteredLogs = logs.filter(log => {
    if (logFilter === "autonomous" && log.humanInLoop !== "Autonomous") return false;
    if (logFilter === "human-approved" && log.humanInLoop !== "Human Approved") return false;
    if (taskIdFilter && log.taskId && !log.taskId.toLowerCase().includes(taskIdFilter.toLowerCase())) return false;
    return true;
  });

  const formatTimestamp = (ts: string) => {
    return new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* PM Agent Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-opz-yellow/20">
            <Bot className="h-5 w-5 text-opz-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">PM Agent</h2>
            <p className="text-sm text-muted-foreground">
              Configure and monitor the AI Project Manager responsible for task orchestration, reporting, and decision logging.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={aiAgentEnabled ? "default" : "secondary"} className={aiAgentEnabled ? "bg-opz-green text-primary-foreground" : ""}>
            {aiAgentEnabled ? "Active" : "Disabled"}
          </Badge>
          <Switch
            checked={aiAgentEnabled}
            onCheckedChange={handleToggleChange}
          />
        </div>
      </div>

      {/* Agent Capabilities Section */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-opz-yellow" />
            <CardTitle className="text-base">Agent Capabilities</CardTitle>
          </div>
          <CardDescription>
            Enable or disable specific AI agent functions for this project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {capabilities.map(cap => (
            <div
              key={cap.id}
              className={`rounded-lg border border-border p-4 transition-opacity ${!aiAgentEnabled ? "opacity-50" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={cap.id}
                    checked={cap.enabled}
                    onCheckedChange={() => toggleCapability(cap.id)}
                    disabled={!aiAgentEnabled}
                  />
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <label
                          htmlFor={cap.id}
                          className="text-sm font-medium text-foreground cursor-pointer hover:text-opz-blue"
                        >
                          {cap.name}
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{cap.description}</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xs text-muted-foreground mt-0.5">{cap.description}</p>
                  </div>
                </div>
                {cap.id === "task-generation" && <FileText className="h-4 w-4 text-muted-foreground" />}
                {cap.id === "weekly-reporting" && <Mail className="h-4 w-4 text-muted-foreground" />}
              </div>
              {cap.subFeatures && cap.enabled && (
                <div className="mt-3 ml-7 space-y-2 border-l-2 border-border pl-4">
                  {cap.subFeatures.map(sub => (
                    <div key={sub.id} className="flex items-center gap-2">
                      <Checkbox
                        id={sub.id}
                        checked={sub.enabled}
                        onCheckedChange={() => toggleSubFeature(cap.id, sub.id)}
                        disabled={!aiAgentEnabled}
                      />
                      <label htmlFor={sub.id} className="text-sm text-muted-foreground cursor-pointer">
                        {sub.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Agent Logs Section */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-opz-blue" />
              <CardTitle className="text-base">Agent Logs & Audit Trail</CardTitle>
            </div>
          </div>
          <CardDescription>
            Chronological log of all PM Agent actions with full decision transparency
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={logFilter} onValueChange={(v) => setLogFilter(v as typeof logFilter)}>
                <SelectTrigger className="w-40 h-8 text-sm">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="autonomous">Autonomous</SelectItem>
                  <SelectItem value="human-approved">Human Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Filter by Task ID..."
              value={taskIdFilter}
              onChange={e => setTaskIdFilter(e.target.value)}
              className="w-40 h-8 text-sm"
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="w-40 h-8 text-sm"
            />
          </div>

          {/* Log Entries */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {filteredLogs.map(log => (
                <Collapsible
                  key={log.id}
                  open={expandedLogs.has(log.id)}
                  onOpenChange={() => toggleLogExpanded(log.id)}
                >
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${log.humanInLoop === "Autonomous" ? "bg-opz-blue" : "bg-opz-green"}`} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{log.action}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                              {log.taskId && (
                                <Badge variant="outline" className="text-xs">
                                  {log.taskId}
                                </Badge>
                              )}
                              <Badge
                                variant={log.humanInLoop === "Autonomous" ? "secondary" : "default"}
                                className={`text-xs ${log.humanInLoop === "Human Approved" ? "bg-opz-green text-primary-foreground" : ""}`}
                              >
                                {log.humanInLoop}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {expandedLogs.has(log.id) ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                        {/* Decision Context */}
                        <div className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-opz-coral mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Decision Context</p>
                            <p className="text-sm text-foreground mt-0.5">{log.decisionContext}</p>
                          </div>
                        </div>

                        {/* Goal Alignment */}
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-opz-green mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Goal Alignment</p>
                            <p className="text-sm text-foreground mt-0.5">{log.goalAlignment}</p>
                          </div>
                        </div>

                        {/* AI Reasoning (Thought Trace) */}
                        <div className="flex items-start gap-2">
                          <Brain className="h-4 w-4 text-opz-yellow mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI Reasoning (Trace)</p>
                            <p className="text-sm text-foreground mt-0.5 font-mono text-xs bg-muted/50 p-2 rounded">{log.thoughtTrace}</p>
                          </div>
                        </div>

                        {/* Dependency Impact */}
                        <div className="flex items-start gap-2">
                          <Link2 className="h-4 w-4 text-opz-blue mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dependency Impact</p>
                            <p className="text-sm text-foreground mt-0.5">{log.dependencyImpact}</p>
                          </div>
                        </div>

                        {/* Human-in-the-Loop */}
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Human-in-the-Loop</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge
                                variant={log.humanInLoop === "Autonomous" ? "secondary" : "default"}
                                className={log.humanInLoop === "Human Approved" ? "bg-opz-green text-primary-foreground" : ""}
                              >
                                {log.humanInLoop}
                              </Badge>
                              {log.approverName && (
                                <span className="text-sm text-muted-foreground">
                                  by {log.approverName} at {formatTimestamp(log.approverTimestamp || "")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Disable Confirmation Dialog */}
      <Dialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <DialogContent className="border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-opz-coral" />
              Disable PM Agent?
            </DialogTitle>
            <DialogDescription>
              Disabling the PM Agent will stop autonomous actions. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDisableDialog(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDisable}
            >
              Disable Agent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
