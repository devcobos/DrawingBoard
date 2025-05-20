import { Eraser, PencilLine } from "lucide-react";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";

interface MenuItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

interface LineProps {
  points: number[];
  stroke: string;
  strokeWidth: number;
  opacity: number;
  tool: string;
  dash?: number[];
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

const DrawingBoard = () => {
  const [lines, setLines] = useState<LineProps[]>([]);
  const [activeItem, setActiveItem] = useState(0);
  const isDrawing = useRef(false);

  const menuItems = [
    { icon: <PencilLine size={18} />, id: 0, tool: "pen" },
    { icon: <Eraser size={18} />, id: 1, tool: "eraser" },
  ];

  const getActiveTool = () => (activeItem === 1 ? "eraser" : "pen");

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines([
      ...lines,
      {
        points: [point.x, point.y],
        stroke: getActiveTool() === "eraser" ? "#fff" : "#E8EEF0",
        strokeWidth: getActiveTool() === "eraser" ? 32 : 8,
        opacity: 0.95,
        tool: getActiveTool(),
      },
    ]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines(lines.slice(0, -1).concat(lastLine));
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-md">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </div>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-emerald-950"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              opacity={line.opacity}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default DrawingBoard;
