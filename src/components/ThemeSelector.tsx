import { Sun, Moon, Pencil } from "lucide-react";
import { useThemeStore } from "../store/Theme.store";
import type { ThemeType } from "../store/Theme.store";

interface ThemeButtonProps {
  icon: React.ReactNode;
  theme: ThemeType;
  isActive: boolean;
  onClick: () => void;
  currentTheme: ThemeType;
}

const ThemeButton = ({ icon, isActive, onClick, currentTheme }: ThemeButtonProps) => {
  // Estilos según el tema actual
  const themeStyles = {
    light: {
      active: "bg-purple-100 text-purple-700",
      inactive: "text-gray-700 hover:bg-gray-100",
      bg: "bg-white"
    },
    dark: {
      active: "bg-purple-800 text-purple-200",
      inactive: "text-gray-300 hover:bg-gray-800",
      bg: "bg-gray-900"
    },
    chalkboard: {
      active: "bg-emerald-800 text-emerald-200",
      inactive: "text-gray-200 hover:bg-emerald-800",
      bg: "bg-emerald-900"
    }
  };

  const styles = themeStyles[currentTheme];

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

const ThemeSelector = () => {
  const { currentTheme, setTheme } = useThemeStore();

  const themeOptions = [
    { icon: <Sun size={18} />, theme: "light" as ThemeType, label: "Claro" },
    { icon: <Moon size={18} />, theme: "dark" as ThemeType, label: "Oscuro" },
    { icon: <Pencil size={18} />, theme: "chalkboard" as ThemeType, label: "Encerado" },
  ];

  // Estilos de fondo según el tema
  const bgStyles = {
    light: "bg-white",
    dark: "bg-gray-900",
    chalkboard: "bg-emerald-900"
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center gap-2 p-2 ${bgStyles[currentTheme]} rounded-2xl shadow-md`}>
        {themeOptions.map((option) => (
          <ThemeButton
            key={option.theme}
            icon={option.icon}
            theme={option.theme}
            isActive={currentTheme === option.theme}
            onClick={() => setTheme(option.theme)}
            currentTheme={currentTheme}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;