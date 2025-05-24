import { create } from 'zustand'

export type Tool = "pen" | "eraser";

interface DrawingState {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

// Create drawing store with Zustand
export const useDrawingStore = create<DrawingState>((set: (state: Partial<DrawingState>) => void) => ({
  activeTool: "pen",
  setActiveTool: (tool: Tool) => set({ activeTool: tool }),
}));
