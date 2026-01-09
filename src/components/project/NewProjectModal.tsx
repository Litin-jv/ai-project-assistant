import { useState } from "react";
import { X, Calendar, Users, FileText, Link2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    members: string;
    startDate: string;
    dueDate: string;
    details: string;
    outcome: string;
    ai_agent_enabled: boolean;
  }) => void;
}

export function NewProjectModal({ open, onOpenChange, onSubmit }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    members: "all-members",
    startDate: "",
    dueDate: "",
    details: "",
    outcome: "",
    ai_agent_enabled: false,
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      members: "all-members",
      startDate: "",
      dueDate: "",
      details: "",
      outcome: "",
      ai_agent_enabled: false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-border bg-card p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FileText className="h-5 w-5 text-opz-yellow" />
            New Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-6 py-4">
          {/* Project Name */}
          <div>
            <Input
              placeholder="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-border"
            />
            <p className="mt-1 text-xs text-destructive">* required.</p>
          </div>

          {/* Members and Dates Row */}
          <div className="grid grid-cols-3 gap-3">
            <Select value={formData.members} onValueChange={(v) => setFormData({ ...formData, members: v })}>
              <SelectTrigger className="border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Members" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-members">all-members</SelectItem>
                <SelectItem value="team-a">Team A</SelectItem>
                <SelectItem value="team-b">Team B</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Start"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="border-border pl-10"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Due"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="border-border pl-10"
              />
            </div>
          </div>
          <p className="text-xs text-destructive">* required.</p>

          {/* Project Details */}
          <div>
            <Textarea
              placeholder="* Project Details
Description (prefix # for adding tags)"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="min-h-[120px] border-border resize-none"
            />
          </div>

          {/* Project Outcome */}
          <div>
            <Textarea
              placeholder="* Project Outcome"
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              className="min-h-[100px] border-border resize-none"
            />
          </div>

          {/* AI Agent Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Enable AI Project Agent</p>
              <p className="text-xs text-muted-foreground">
                AI will assist in generating and managing tasks for this project.
              </p>
            </div>
            <Switch
              checked={formData.ai_agent_enabled}
              onCheckedChange={(checked) => setFormData({ ...formData, ai_agent_enabled: checked })}
            />
          </div>

          {/* Add Members */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Users className="h-4 w-4" />
              Add Members
            </div>
            <p className="mt-1 text-xs text-destructive">* required.</p>
          </div>

          {/* Resources */}
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Resources to aid project execution</p>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm text-foreground hover:text-opz-blue">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-opz-yellow-light">
                  <FileText className="h-4 w-4 text-opz-yellow" />
                </span>
                Files
              </button>
              <button className="flex items-center gap-2 text-sm text-foreground hover:text-opz-blue">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-opz-blue-light">
                  <Link2 className="h-4 w-4 text-opz-blue" />
                </span>
                Links
                <Plus className="h-4 w-4 text-opz-yellow" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <Button 
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-border"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
