import {
  Home,
  PenTool,
  SquareLibrary,
  KeyRound,
  UserRoundPlus,
  BookType,
  LucideProps,
  Heart,
  Tag,
} from "lucide-react";
import { NavLink } from "react-router";
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
import { ModeToggle } from "../ui/mode-toggle";

// Type definitions
interface NavItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
}

// Constants
const MAIN_NAV_ITEMS: NavItem[] = [
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
    title: "Tags",
    url: "/tags",
    icon: Tag,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
];

const getAuthNavItems = (): NavItem[] => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return [
      {
        title: "Sign in",
        url: "/signin",
        icon: KeyRound,
      },
      {
        title: "Sign up",
        url: "/signup",
        icon: UserRoundPlus,
      },
    ];
  }

  return [
    {
      title: "Sign out",
      url: "#", // Using # since we handle click separately
      icon: UserRoundPlus,
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.reload();
      },
    },
  ];
};

// Sub-components
const BrandSection = () => (
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to="/"
              className="flex items-center gap-2">
              <BookType />
              <span>Bookify</span>
            </NavLink>
          </SidebarMenuButton>
          <div className="flex items-center gap-2 mt-2 ml-2">
            <span className="text-xmd">Change theme</span>
            <ModeToggle />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

const NavMenuSection = ({
  items,
  label,
}: {
  items: NavItem[];
  label: string;
}) => (
  <SidebarGroup>
    <SidebarGroupLabel>{label}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-2 w-full">
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              ) : (
                <NavLink
                  to={item.url}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-primary font-medium" : ""
                    }`
                  }>
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
);

// Main component
export function AppSidebar() {
  const authItems = getAuthNavItems();

  return (
    <Sidebar
      className="m-2 border-1 border-gray-200 rounded-md h-[98vh]"
      collapsible="none"
      variant="floating">
      <SidebarHeader>
        <BrandSection />
      </SidebarHeader>

      <SidebarContent>
        <NavMenuSection
          items={MAIN_NAV_ITEMS}
          label="Application"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavMenuSection
          items={authItems}
          label="Connexion"
        />
      </SidebarFooter>
    </Sidebar>
  );
}
