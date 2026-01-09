import { Search, Bell, ChevronDown, Grid3X3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <button className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted">
          <Grid3X3 className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <span className="text-xl font-bold text-foreground">opz</span>
          <span className="text-xl font-bold text-opz-yellow">HIVE</span>
        </div>
      </div>

      {/* Center: Plan Notice */}
      <div className="flex items-center gap-2 rounded-full border border-opz-yellow bg-opz-yellow-light px-4 py-1.5">
        <span className="text-sm text-foreground">Your plan will end in 3 Days</span>
        <button className="text-sm font-medium text-opz-blue hover:underline">Renew</button>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="h-9 w-48 rounded-md border-border bg-background pl-9 text-sm"
          />
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted">
          <Search className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-opz-yellow-light text-sm font-medium text-foreground">A</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">CEO</p>
            <p className="text-xs text-opz-yellow">(adminBee)</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
