import { Eraser, PencilLine } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Layer, Line, Stage } from "react-konva";

interface MenuItemProps {
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

interface LineProps {
  points: number[];
  stroke: string;
  strokeWidth: number;
  opacity?: number;
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
  const stageRef = useRef<any>(null);

  const menuItems = [
    { icon: <PencilLine size={18} />, id: 0, tool: "pen" },
    { icon: <Eraser size={18} />, id: 1, tool: "eraser" },
  ];

  const getActiveTool = () => (activeItem === 1 ? "eraser" : "pen");

  const handleStart = () => {
    isDrawing.current = true;
    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    setLines([
      ...lines,
      {
        points: [point.x, point.y],
        stroke: getActiveTool() === "eraser" ? "#fff" : "#E8EEF0",
        strokeWidth: getActiveTool() === "eraser" ? 32 : 8,
        opacity: getActiveTool() === "eraser" ? 1 : 0.95,
        tool: getActiveTool(),
      },
    ]);
  };

  const handleMove = () => {
    if (!isDrawing.current) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines(lines.slice(0, -1).concat(lastLine));
  };

  const handleEnd = () => {
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
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        className="full h-screen bg-emerald-950"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              opacity={line?.opacity ?? 1}
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
