// Command palette hook for managing quick navigation and actions
// T026
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CommandItem } from '../components/advanced/CommandPalette';

interface UseCommandPaletteOptions {
  defaultCommands?: CommandItem[];
  enableKeyboardShortcut?: boolean;
  shortcutKey?: string;
  shortcutModifier?: 'ctrl' | 'cmd' | 'alt' | 'shift';
}

interface UseCommandPaletteReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  commands: CommandItem[];
  addCommand: (command: CommandItem) => void;
  removeCommand: (id: string) => void;
  updateCommand: (id: string, updates: Partial<CommandItem>) => void;
  executeCommand: (id: string) => void;
}

export const useCommandPalette = (
  options: UseCommandPaletteOptions = {}
): UseCommandPaletteReturn => {
  const {
    defaultCommands = [],
    enableKeyboardShortcut = true,
    shortcutKey = 'k',
    shortcutModifier = 'cmd',
  } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [commands, setCommands] = useState<CommandItem[]>(defaultCommands);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  // Default navigation commands
  const defaultNavigationCommands = useMemo<CommandItem[]>(() => [
    {
      id: 'nav-home',
      title: 'Go to Home',
      description: 'Navigate to the home section',
      category: 'Navigation',
      keywords: ['home', 'start', 'beginning'],
      action: () => {
        const homeElement = document.getElementById('home');
        if (homeElement) {
          homeElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'nav-about',
      title: 'Go to About',
      description: 'Navigate to the about section',
      category: 'Navigation',
      keywords: ['about', 'me', 'bio'],
      action: () => {
        const aboutElement = document.getElementById('about');
        if (aboutElement) {
          aboutElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      description: 'Navigate to the projects section',
      category: 'Navigation',
      keywords: ['projects', 'work', 'portfolio'],
      action: () => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'nav-blog',
      title: 'Go to Blog',
      description: 'Navigate to the blog section',
      category: 'Navigation',
      keywords: ['blog', 'articles', 'writing'],
      action: () => {
        const blogElement = document.getElementById('blog');
        if (blogElement) {
          blogElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      description: 'Navigate to the contact section',
      category: 'Navigation',
      keywords: ['contact', 'email', 'reach'],
      action: () => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      id: 'theme-toggle',
      title: 'Toggle Theme',
      description: 'Switch between light and dark themes',
      category: 'Settings',
      keywords: ['theme', 'dark', 'light', 'mode'],
      action: () => {
        // This would integrate with theme system
        // console.log('Theme toggle action');
      },
    },
    {
      id: 'scroll-top',
      title: 'Scroll to Top',
      description: 'Scroll to the top of the page',
      category: 'Navigation',
      keywords: ['top', 'beginning', 'start'],
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ], []);

  // Initialize with default commands
  useEffect(() => {
    setCommands(prev => {
      const existingIds = new Set(prev.map(cmd => cmd.id));
      const newCommands = defaultNavigationCommands.filter(cmd => !existingIds.has(cmd.id));
      return [...prev, ...newCommands];
    });
  }, [defaultNavigationCommands]);

  // Keyboard shortcut handler
  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifierPressed = (() => {
        switch (shortcutModifier) {
          case 'ctrl': return e.ctrlKey || e.metaKey;
          case 'cmd': return e.metaKey;
          case 'alt': return e.altKey;
          case 'shift': return e.shiftKey;
          default: return false;
        }
      })();

      if (isModifierPressed && e.key.toLowerCase() === shortcutKey.toLowerCase()) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcut, shortcutKey, shortcutModifier, toggle]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  const addCommand = useCallback((command: CommandItem) => {
    setCommands(prev => {
      // Remove existing command with same ID if it exists
      const filtered = prev.filter(cmd => cmd.id !== command.id);
      return [...filtered, command];
    });
  }, []);

  const removeCommand = useCallback((id: string) => {
    setCommands(prev => prev.filter(cmd => cmd.id !== id));
  }, []);

  const updateCommand = useCallback((id: string, updates: Partial<CommandItem>) => {
    setCommands(prev =>
      prev.map(cmd =>
        cmd.id === id ? { ...cmd, ...updates } : cmd
      )
    );
  }, []);

  const executeCommand = useCallback((id: string) => {
    const command = commands.find(cmd => cmd.id === id);
    if (command) {
      command.action();
    }
  }, [commands]);

  return {
    isOpen,
    open,
    close,
    toggle,
    commands,
    addCommand,
    removeCommand,
    updateCommand,
    executeCommand,
  };
};

export default useCommandPalette;