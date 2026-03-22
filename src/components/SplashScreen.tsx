import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, Brain, Sparkles, Zap, Trophy, ArrowRight, Star, User, Plus, X } from 'lucide-react';

interface SplashScreenProps {
  onComplete: (mode: 'INDIVIDUAL' | 'TEAM', names: string[]) => void;
}

const features = [
  { icon: Brain, title: 'Brain Teasers', description: 'Challenge your mind', color: 'from-purple-500 to-indigo-500' },
  { icon: Users, title: 'Team Play', description: 'Compete together', color: 'from-blue-500 to-cyan-500' },
  { icon: Trophy, title: 'Tournaments', description: 'Win prizes', color: 'from-amber-500 to-orange-500' },
  { icon: Sparkles, title: 'Adventure', description: 'Epic quests', color: 'from-emerald-500 to-green-500' },
];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'INDIVIDUAL' | 'TEAM' | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>(['']);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showFeatures) {
      const interval = setInterval(() => {
        setCurrentFeature(prev => {
          if (prev >= features.length - 1) {
            clearInterval(interval);
            setTimeout(() => setShowMain(true), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [showFeatures]);

  const handleSkip = () => {
    setShowModeSelect(true);
  };

  const handleModeSelect = (mode: 'INDIVIDUAL' | 'TEAM') => {
    setSelectedMode(mode);
    if (mode === 'INDIVIDUAL') {
      setPlayerNames(['']);
    } else {
      setTeamName('');
    }
  };

  const handleAddPlayer = () => {
    if (playerNames.length < 8) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerNames.length > 1) {
      const newNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newNames);
    }
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleSubmit = () => {
    if (selectedMode === 'INDIVIDUAL') {
      const validNames = playerNames.filter(n => n.trim() !== '');
      if (validNames.length > 0) {
        onComplete('INDIVIDUAL', validNames);
      }
    } else if (selectedMode === 'TEAM' && teamName.trim()) {
      onComplete('TEAM', [teamName.trim()]);
    }
  };

  const canProceed = selectedMode === 'INDIVIDUAL' 
    ? playerNames.some(n => n.trim() !== '')
    : teamName.trim() !== '';

  // Mode Selection Screen
  if (showModeSelect) {
    return (
      <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-full max-w-md px-6"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Gamepad2 size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">How to Play</h2>
            <p className="text-zinc-400">Choose your game mode</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!selectedMode ? (
              <motion.div
                key="mode-select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Solo Mode */}
                <motion.button
                  onClick={() => handleModeSelect('INDIVIDUAL')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/30 hover:border-pink-500 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center">
                      <User size={28} className="text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-white">Solo</h3>
                      <p className="text-zinc-400 text-sm">Play alone or add multiple players</p>
                    </div>
                    <ArrowRight size={24} className="text-pink-400" />
                  </div>
                </motion.button>

                {/* Group Mode */}
                <motion.button
                  onClick={() => handleModeSelect('TEAM')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-6 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-2 border-indigo-500/30 hover:border-indigo-500 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                      <Users size={28} className="text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-white">Team</h3>
                      <p className="text-zinc-400 text-sm">Compete in teams</p>
                    </div>
                    <ArrowRight size={24} className="text-indigo-400" />
                  </div>
                </motion.button>

                <button
                  onClick={() => setShowModeSelect(false)}
                  className="w-full mt-4 py-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Back
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setSelectedMode(null)}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-2"
                >
                  <ArrowRight className="rotate-180" size={20} /> Back
                </button>

                {selectedMode === 'INDIVIDUAL' ? (
                  <>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Enter Player Names</h3>
                      <p className="text-zinc-400 text-sm mb-4">Add at least one player to continue</p>
                    </div>
                    
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {playerNames.map((name, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                            placeholder={`Player ${index + 1}`}
                            className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-pink-500 focus:outline-none"
                          />
                          {playerNames.length > 1 && (
                            <button
                              onClick={() => handleRemovePlayer(index)}
                              className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleAddPlayer}
                      disabled={playerNames.length >= 8}
                      className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-700 text-zinc-400 hover:border-pink-500 hover:text-pink-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Plus size={20} /> Add Player
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Enter Team Name</h3>
                      <p className="text-zinc-400 text-sm mb-4">Give your team a name</p>
                    </div>
                    
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name"
                      className="w-full px-4 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none text-lg"
                    />
                  </>
                )}

                <motion.button
                  onClick={handleSubmit}
                  disabled={!canProceed}
                  whileHover={{ scale: canProceed ? 1.02 : 1 }}
                  whileTap={{ scale: canProceed ? 0.98 : 1 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    canProceed
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  Let's Play!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Original Splash Screen
  return (
    <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-[150px]" 
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              scale: [0, 1, 0],
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Logo Section */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-16"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative inline-block"
        >
          <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(139,92,246,0.5)] ring-4 ring-indigo-500/30">
            <Gamepad2 size={56} className="text-white" />
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl opacity-50 -z-10" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-7xl font-black mb-4 tracking-tight font-display bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent"
        >
          VIBE TEAM
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-400 text-xl font-medium"
        >
          The Ultimate Meeting Engagement Platform
        </motion.p>
      </motion.div>

      {/* Features Carousel */}
      <AnimatePresence>
        {showFeatures && !showMain && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10 mb-12"
          >
            <div className="flex items-center justify-center gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={false}
                  animate={{ 
                    scale: index === currentFeature ? 1 : 0.85,
                    opacity: index === currentFeature ? 1 : 0.4,
                  }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r ${feature.color} ${
                    index === currentFeature ? 'shadow-lg' : ''
                  }`}
                >
                  <feature.icon size={24} className="text-white" />
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">{feature.title}</p>
                    <p className="text-white/70 text-xs">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ 
                    width: index === currentFeature ? 24 : 8,
                    backgroundColor: index === currentFeature ? '#818cf8' : '#52525b'
                  }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main CTA */}
      <AnimatePresence>
        {showMain && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center"
          >
            <motion.button
              onClick={handleSkip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-2xl font-bold text-xl text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all"
            >
              Get Started
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setShowModeSelect(true)}
              className="block mt-6 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Skip intro
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
