import { useRef, useState, useEffect } from "react";
import { Layer, Line, Stage } from "react-konva";
import { useDrawingStore } from "../store/ActiveTool.store";
import { useThemeStore } from "../store/Theme.store";

interface LineProps {
  points: number[];
  stroke: string;
  strokeWidth: number;
  opacity?: number;
  tool: string;
  dash?: number[];
}

const DrawingBoard = () => {
  const [lines, setLines] = useState<LineProps[]>([]);
  const { activeTool } = useDrawingStore();
  const { currentTheme, setOnThemeChange } = useThemeStore();
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);

  const themeColors = {
    light: {
      background: "#FFFFFF",
      stroke: "#000000",
      eraser: "#FFFFFF"
    },
    dark: {
      background: "#000000",
      stroke: "#FFFFFF",
      eraser: "#000000"
    },
    chalkboard: {
      background: "#064e3b", 
      stroke: "#E8EEF0",
      eraser: "#064e3b"
    }
  };

  useEffect(() => {
    setOnThemeChange(() => {
      setLines([]);
    });

    return () => {
      setOnThemeChange(null);
    };
  }, [setOnThemeChange]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
      }
    };

    // Añadir event listener al documento
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mouseleave", handleGlobalMouseUp);
    
    // Limpiar event listeners al desmontar
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, []);

  const handleStart = (e: any) => {
    e.evt.preventDefault();

    isDrawing.current = true;
    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    setLines([
      ...lines,
      {
        points: [point.x, point.y],
        stroke: activeTool === "eraser" ? themeColors[currentTheme].eraser : themeColors[currentTheme].stroke,
        strokeWidth: activeTool === "eraser" ? 32 : 8,
        opacity: 1,
        tool: activeTool,
      },
    ]);
  };

  const handleMove = (e: any) => {
    e.evt.preventDefault();

    if (!isDrawing.current) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines(lines.slice(0, -1).concat(lastLine));
  };

  const handleEnd = (e: any) => {
    e.evt.preventDefault();

    isDrawing.current = false;
  };

  return (
    <>
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
        className="full h-screen"
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
