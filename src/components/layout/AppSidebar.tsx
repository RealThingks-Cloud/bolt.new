import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Teachers', href: '/teachers', icon: GraduationCap },
  { name: 'Classes', href: '/classes', icon: Calendar },
  { name: 'Fees', href: '/fees', icon: DollarSign },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) =>
    isActive(path)
      ? 'bg-secondary text-secondary-foreground font-medium shadow-sm'
      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground';

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out.',
      });
    }
  };

  return (
    <Sidebar className={!open ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-border/10 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-secondary rounded-lg p-2">
            <GraduationCap className="h-6 w-6 text-secondary-foreground" />
          </div>
          {open && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tuition Manager</h2>
              <p className="text-sm text-muted-foreground">Coaching Institute</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="sidebar-gradient">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/80 font-medium">
            {open && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      className={`${getNavCls(item.href)} flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="font-medium">{item.name}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/10 p-4">
        <div className="space-y-2">
          {open && user && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/50">
              <div className="bg-primary rounded-full p-1">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.email}
                </p>
                <p className="text-xs text-muted-foreground">Staff</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size={!open ? "sm" : "default"}
            onClick={handleSignOut}
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {open && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}