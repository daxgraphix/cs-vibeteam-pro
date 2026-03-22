import { useState } from 'react';
import { Gamepad2, Settings, Zap, Menu } from 'lucide-react';
import { Theme, Difficulty } from '../types';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  onReset: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  difficulty: Difficulty;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  onOpenSidebar?: () => void;
}

export function Header({ 
  onReset, 
  theme, 
  onToggleTheme, 
  difficulty, 
  onChangeDifficulty,
  onOpenSidebar
}: HeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className={`flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenSidebar && (
            <button 
              onClick={onOpenSidebar}
              className={`p-2 sm:p-2.5 rounded-xl transition-all touch-spacing ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900'}`}
            >
              <Menu size={22} className="sm:size-24" />
            </button>
          )}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Gamepad2 size={20} className="sm:size-24" />
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight font-display ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>VibeTeam</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
            <Zap size={14} className="text-amber-500" />
            {difficulty}
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className={`p-2 sm:p-2.5 rounded-xl transition-all touch-spacing ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900'}`}
          >
            <Settings size={18} className="sm:size-20" />
          </button>
        </div>
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onReset={onReset}
        theme={theme}
        onToggleTheme={onToggleTheme}
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
      />
    </>
  );
}
