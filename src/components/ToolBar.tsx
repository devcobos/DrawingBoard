import { Eraser, PencilLine } from "lucide-react";
import { type ReactNode } from "react";
import { useDrawingStore } from "../store/ActiveTool.store";
import type { Tool } from "../store/ActiveTool.store";

interface MenuItemProps {
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ icon, isActive = false, onClick }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-colors cursor-pointer 
        ${
          isActive
            ? "bg-purple-100 text-purple-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {icon}
    </button>
  );
};

const ToolBar = () => {
  const { activeTool, setActiveTool } = useDrawingStore();

  const menuItems = [
    { icon: <PencilLine size={18} />, id: 0, tool: "pen" as Tool },
    { icon: <Eraser size={18} />, id: 1, tool: "eraser" as Tool },
  ];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-md">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            isActive={activeTool === item.tool}
            onClick={() => setActiveTool(item.tool)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolBar;