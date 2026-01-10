import { useState } from "react";
import { FileText, Calendar, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  teamMembers: { id: string; name: string }[];
  onAddTask: (task: {
    title: string;
    description: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    category: string;
    severity: number;
    publishable: boolean;
  }) => void;
}

const categories = [
  "S-Micro-Ecosystem",
  "Development",
  "Design",
  "Planning",
  "Review",
  "Testing",
];

export function AddTaskModal({
  open,
  onOpenChange,
  projectName,
  teamMembers,
  onAddTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Development");
  const [severity, setSeverity] = useState(3);
  const [publishable, setPublishable] = useState(true);

  const handleSubmit = () => {
    if (!title || !startDate || !dueDate) return;

    onAddTask({
      title,
      description,
      assignee: assignee || "Unassigned",
      startDate,
      dueDate,
      category,
      severity,
      publishable,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setAssignee("");
    setStartDate("");
    setDueDate("");
    setCategory("Development");
    setSeverity(3);
    setPublishable(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border bg-card p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FileText className="h-5 w-5 text-opz-yellow" />
            New Task
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          {/* Task Name & Project */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Label className="text-sm text-foreground">Task Name</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task name"
                className="mt-1 border-border"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <span className="text-sm text-muted-foreground">Project:</span>
              <span className="text-sm font-medium text-foreground">{projectName}</span>
            </div>
          </div>

          {/* Assignee, Start Date, Due Date Row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="border-border">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-opz-yellow" />
                    <SelectValue placeholder="Assignee" />
                  </div>
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
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Start Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-border pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <span className="text-xs text-opz-coral">* required.</span>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Due Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border-border pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <span className="text-xs text-opz-coral">* required.</span>
            </div>
          </div>

          {/* Details */}
          <div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details"
              className="min-h-[120px] border-border resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm text-foreground">Tags +</Label>
          </div>

          {/* Category & Publishable Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">Publishable</span>
              <Switch checked={publishable} onCheckedChange={setPublishable} />
            </div>
          </div>

          {/* Severity */}
          <div>
            <Label className="text-sm text-foreground mb-2 block">Severity</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setSeverity(level)}
                  className={`h-4 w-4 rounded-full ${
                    level <= severity ? "bg-opz-yellow" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <Label className="text-sm text-muted-foreground">Resources to aid task execution</Label>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Files</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>🔗</span>
                <span>Links</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border px-6 py-4">
          <Button
            onClick={handleSubmit}
            disabled={!title || !startDate || !dueDate}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Task
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
