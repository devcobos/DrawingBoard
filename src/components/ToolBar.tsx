import { Eraser, PencilLine } from "lucide-react";
import { type ReactNode } from "react";
import type { Tool } from "../store/ActiveTool.store";
import { useDrawingStore } from "../store/ActiveTool.store";
import { useThemeStore } from "../store/Theme.store";

interface MenuItemProps {
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  theme: string;
}

const MenuItem = ({
  icon,
  isActive = false,
  onClick,
  theme,
}: MenuItemProps) => {
  // Estilos según el tema
  const themeStyles = {
    light: {
      active: "bg-purple-100 text-purple-700",
      inactive: "text-gray-700 hover:bg-gray-100",
      bg: "bg-white",
    },
    dark: {
      active: "bg-purple-800 text-purple-200",
      inactive: "text-gray-300 hover:bg-gray-800",
      bg: "bg-gray-900",
    },
    chalkboard: {
      active: "bg-emerald-800 text-emerald-200",
      inactive: "text-gray-200 hover:bg-emerald-800",
      bg: "bg-emerald-900",
    },
  };

  const styles = themeStyles[theme as keyof typeof themeStyles];

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-colors cursor-pointer 
        ${isActive ? styles.active : styles.inactive}`}
    >
      {icon}
    </button>
  );
};

const ToolBar = () => {
  const { activeTool, setActiveTool } = useDrawingStore();
  const { currentTheme } = useThemeStore();

  const menuItems = [
    { icon: <PencilLine size={18} />, id: 0, tool: "pen" as Tool },
    { icon: <Eraser size={18} />, id: 1, tool: "eraser" as Tool },
  ];

  // Estilos de fondo según el tema
  const bgStyles = {
    light: "bg-white",
    dark: "bg-gray-900",
    chalkboard: "bg-emerald-900",
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div
        className={`flex items-center gap-2 p-2 ${bgStyles[currentTheme]} rounded-2xl shadow-md`}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            isActive={activeTool === item.tool}
            onClick={() => setActiveTool(item.tool)}
            theme={currentTheme}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
