import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppsidebarLogout from "./app-sidebarLogout";
import AppsidebarTitle from "./app-sidebarTitle";
import SideBars from "./SideBars";

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="absolute -right-10 top-3">
              <SidebarTrigger/>
            </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-4">
            <AppsidebarTitle />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            
            <SidebarMenu>
              <SideBars />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppsidebarLogout />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
