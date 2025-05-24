import DrawingBoard from './components/DrawingBoard';
import ToolBar from './components/ToolBar';
import ThemeSelector from './components/ThemeSelector';
import { useThemeStore } from './store/Theme.store';

function App() {
  const { currentTheme } = useThemeStore();

  // Clases para cada tema
  const themeClasses = {
    light: 'bg-white text-black',
    dark: 'bg-gray-950 text-white',
    chalkboard: 'bg-emerald-950 text-white'
  };

  return (
    <div className={`min-h-screen ${themeClasses[currentTheme]}`}>
      <ToolBar />
      <ThemeSelector />
      <DrawingBoard />
    </div>
  );
}

export default App;
