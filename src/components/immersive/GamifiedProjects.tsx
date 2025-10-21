// Gamified projects component for immersive storytelling experience
// T017
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Lock, Unlock } from 'lucide-react';
import { shouldReduceMotion } from '../../utils/animations';

interface ProjectAchievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GamifiedProjectsProps {
  className?: string;
}

const GamifiedProjects: React.FC<GamifiedProjectsProps> = ({ className = '' }) => {
  const [achievements, setAchievements] = useState<ProjectAchievement[]>([
    {
      id: 'first-view',
      title: 'Curious Explorer',
      description: 'Viewed your first project',
      icon: <Award size={20} />,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'common',
    },
    {
      id: 'project-master',
      title: 'Project Master',
      description: 'Explored all projects',
      icon: <Trophy size={20} />,
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      rarity: 'epic',
    },
  ]);

  const [showAchievements, setShowAchievements] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<string | null>(null);

  // Mock projects data (in real app, this would come from props or API)
  const projects = [
    {
      id: 'nutri-focus',
      title: 'Nutri Focus',
      description: 'AI-Powered Ethiopian Nutrition System',
      difficulty: 'Expert',
      points: 150,
      tags: ['AI/ML', 'Full-Stack', 'Healthcare'],
      completed: false,
    },
    {
      id: 'linkpharm',
      title: 'LinkPharm',
      description: 'B2B Pharmaceutical Marketplace',
      difficulty: 'Advanced',
      points: 120,
      tags: ['Backend', 'E-commerce'],
      completed: false,
    },
    {
      id: 'e-commerce-platform',
      title: 'E-commerce Platform',
      description: 'Full-Stack E-commerce Application',
      difficulty: 'Intermediate',
      points: 100,
      tags: ['Full-Stack', 'React', 'Node.js'],
      completed: false,
    },
  ];

  // Achievement system
  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, progress: achievement.maxProgress }
          : achievement
      )
    );
    setUnlockedAchievement(achievementId);

    // Hide achievement notification after 3 seconds
    setTimeout(() => setUnlockedAchievement(null), 3000);
  };

  const updateProgress = (achievementId: string, progress: number) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, progress: Math.min(progress, achievement.maxProgress) }
          : achievement
      )
    );

    // Check if achievement should be unlocked
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && progress >= achievement.maxProgress && !achievement.unlocked) {
      unlockAchievement(achievementId);
    }
  };

  // Handle project interactions
  const handleProjectClick = () => {
    // Update achievements
    updateProgress('first-view', 1);
    updateProgress('project-master', achievements.find(a => a.id === 'project-master')!.progress + 1);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-500';
      case 'rare': return 'text-blue-400 border-blue-500';
      case 'epic': return 'text-purple-400 border-purple-500';
      case 'legendary': return 'text-yellow-400 border-yellow-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (shouldReduceMotion()) {
    return (
      <div className={`space-y-8 ${className}`}>
        {/* Achievement Banner */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Trophy className="text-yellow-400" size={24} />
            <span className="text-white font-semibold">Project Achievements</span>
          </div>
          <button
            onClick={() => setShowAchievements(!showAchievements)}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white transition-colors"
          >
            {showAchievements ? 'Hide' : 'Show'} Achievements
          </button>
        </div>

        {/* Achievement Notification */}
        {unlockedAchievement && (
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award size={24} />
              <div>
                <h4 className="font-bold">Achievement Unlocked!</h4>
                <p>{achievements.find(a => a.id === unlockedAchievement)?.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Grid */}
        {showAchievements && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked
                    ? 'bg-slate-700/50 border-slate-600'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg border ${getRarityColor(achievement.rarity)}`}>
                    {achievement.unlocked ? (
                      <Unlock size={16} />
                    ) : (
                      <Lock size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-neutral-400'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-neutral-400">{achievement.description}</p>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  {achievement.progress}/{achievement.maxProgress}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={handleProjectClick}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 cursor-pointer hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <Star className="text-yellow-400" size={16} />
                </div>
              </div>

              <p className="text-neutral-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-semibold">{project.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Achievement Banner */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Trophy className="text-yellow-400" size={24} />
          </motion.div>
          <span className="text-white font-semibold">Project Achievements</span>
        </div>
        <motion.button
          onClick={() => setShowAchievements(!showAchievements)}
          className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAchievements ? 'Hide' : 'Show'} Achievements
        </motion.button>
      </motion.div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {unlockedAchievement && (
          <motion.div
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                <Award size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold">Achievement Unlocked!</h4>
                <p>{achievements.find(a => a.id === unlockedAchievement)?.title}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Grid */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked
                    ? 'bg-slate-700/50 border-slate-600'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <motion.div
                    className={`p-2 rounded-lg border ${getRarityColor(achievement.rarity)}`}
                    whileHover={{ rotate: achievement.unlocked ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {achievement.unlocked ? (
                      <Unlock size={16} />
                    ) : (
                      <Lock size={16} />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-neutral-400'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-neutral-400">{achievement.description}</p>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  {achievement.progress}/{achievement.maxProgress}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            onClick={handleProjectClick}
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 cursor-pointer hover:bg-slate-700/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Star className="text-yellow-400" size={16} />
                </motion.div>
              </div>
            </div>

            <p className="text-neutral-300 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-semibold">{project.points} pts</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GamifiedProjects;
