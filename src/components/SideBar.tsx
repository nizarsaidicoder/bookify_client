import {
  Home,
  PenTool,
  SquareLibrary,
  KeyRound,
  UserRoundPlus,
  BookType,
  LucideProps,
  Heart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { ModeToggle } from "./ui/mode-toggle";
interface NavItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
// Menu items.
const items: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Authors",
    url: "/authors",
    icon: PenTool,
  },
  {
    title: "Books",
    url: "/books",
    icon: SquareLibrary,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
];

const auth_items: NavItem[] = [];

if (!localStorage.getItem("token")) {
  auth_items.push({
    title: "Sign in",
    url: "/signin",
    icon: KeyRound,
  });
  auth_items.push({
    title: "Sign up",
    url: "/signup",
    icon: UserRoundPlus,
  });
} else
  auth_items.push({
    title: "Sign out",
    url: "/",
    icon: UserRoundPlus,
  });

export function AppSidebar() {
  const signout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Sidebar
      className="m-2 border-1 border-gray-200 rounded-md h-[98vh]"
      collapsible="none"
      variant="floating">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/">
                    <BookType />
                    <span>Bookify</span>
                  </NavLink>
                </SidebarMenuButton>
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <span className="text-xmd ">Change theme</span>
                  <ModeToggle />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Connexion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {auth_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Sign out" ? (
                      <button onClick={signout}>
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
