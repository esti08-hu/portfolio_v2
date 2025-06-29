"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/providers/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ] as const

  const currentTheme = themes.find((t) => t.name === theme) || themes[2]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative w-9 h-9 p-0 rounded-lg hover:bg-primary-800/50 dark:hover:bg-neutral-800/50 transition-all duration-300 group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <currentTheme.icon className="h-4 w-4 text-neutral-400 group-hover:text-neutral-50 dark:text-neutral-400 dark:group-hover:text-neutral-50 transition-colors duration-300" />
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-primary-950/95 dark:bg-neutral-950/95 backdrop-blur-xl border-primary-800/50 dark:border-neutral-800/50"
      >
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            className="flex items-center space-x-2 cursor-pointer hover:bg-primary-800/50 dark:hover:bg-neutral-800/50 focus:bg-primary-800/50 dark:focus:bg-neutral-800/50"
          >
            <themeOption.icon className="h-4 w-4" />
            <span>{themeOption.label}</span>
            {theme === themeOption.name && (
              <motion.div
                layoutId="activeTheme"
                className="w-2 h-2 bg-accent-400 rounded-full ml-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
