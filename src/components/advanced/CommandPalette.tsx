// Command palette component for quick navigation and actions
// T024
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
  placeholder?: string;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  commands,
  placeholder = "Type a command or search...",
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;

    const searchTerm = query.toLowerCase();
    return commands.filter(command =>
      command.title.toLowerCase().includes(searchTerm) ||
      command.description?.toLowerCase().includes(searchTerm) ||
      command.category.toLowerCase().includes(searchTerm) ||
      command.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  }, [commands, query]);

  // Reset selection when commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          ref={paletteRef}
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-full max-w-lg mx-4 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center px-4 py-3 border-b border-slate-700">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-400 outline-none"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-activedescendant={filteredCommands[selectedIndex] ? `command-${filteredCommands[selectedIndex].id}` : undefined}
            />
            <div className="flex items-center space-x-1 ml-3">
              <kbd className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded border border-slate-600">
                <Command className="w-3 h-3 inline mr-1" />
                K
              </kbd>
            </div>
          </div>

          {/* Commands list */}
          <div className="max-h-80 overflow-y-auto" role="listbox" aria-label="Command results">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-400" role="status" aria-live="polite">
                <div className="text-2xl mb-2">🔍</div>
                <div>No commands found</div>
                <div className="text-sm text-slate-500 mt-1">
                  Try searching for something else
                </div>
              </div>
            ) : (
              <div className="py-2">
                {filteredCommands.map((command, index) => (
                  <motion.div
                    key={command.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-600/20 border-l-2 border-blue-500'
                        : 'hover:bg-slate-800/50'
                    }`}
                    onClick={() => {
                      command.action();
                      onClose();
                    }}
                    role="option"
                    aria-selected={index === selectedIndex}
                    id={`command-${command.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-slate-200 font-medium">
                          {command.title}
                        </div>
                        {command.description && (
                          <div className="text-slate-400 text-sm mt-1">
                            {command.description}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        {command.category}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with keyboard hints */}
          <div className="px-4 py-3 border-t border-slate-700 bg-slate-900/50">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-3 h-3" />
                  <ArrowDown className="w-3 h-3" />
                  <span>Navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CornerDownLeft className="w-3 h-3" />
                  <span>Select</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1 py-0.5 text-xs bg-slate-700 text-slate-300 rounded">ESC</kbd>
                  <span>Close</span>
                </div>
              </div>
              <div className="text-slate-500">
                {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;
export type { CommandItem };
