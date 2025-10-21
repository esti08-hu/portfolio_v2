# Data Model: Micro-Interaction Enhancements

**Feature**: 002-micro-interactions-enhancements
**Date**: October 21, 2025

## Overview

This feature is primarily UI-focused with minimal data persistence. Data models represent runtime state and external API responses.

## Core Entities

### CursorState
Represents the current state of custom cursor interactions.

**Fields**:
- `position: {x: number, y: number}` - Current cursor coordinates
- `isVisible: boolean` - Cursor visibility state
- `effect: 'default' | 'glow' | 'morph'` - Active cursor effect
- `trail: Array<{x: number, y: number, timestamp: number}>` - Glow trail positions

**Validation**: Position coordinates must be within viewport bounds
**Relationships**: None

### ApiData
Represents cached external API responses for dynamic content.

**Fields**:
- `githubStats: {commits: number, repos: number, languages: string[]}` - GitHub statistics
- `lastFetched: Date` - Cache timestamp
- `isStale: boolean` - Whether data needs refresh
- `error: string | null` - Last fetch error

**Validation**: Stats must be non-negative numbers
**Relationships**: None (external API data)

### UserPreferences
User-configurable settings for interactive features.

**Fields**:
- `theme: 'light' | 'dark' | 'auto'` - Theme preference
- `soundEnabled: boolean` - Sound effects toggle
- `reducedMotion: boolean` - Respects accessibility preference
- `animationsEnabled: boolean` - Master animation toggle

**Validation**: Theme must be valid option
**Relationships**: Influences all interactive components

### InteractionState
Runtime state for complex interactions like 3D scenes and command palette.

**Fields**:
- `commandPaletteOpen: boolean` - Command palette visibility
- `searchQuery: string` - Current search input
- `selectedIndex: number` - Active selection in lists
- `sceneLoaded: boolean` - 3D scene initialization status

**Validation**: Selected index must be within bounds
**Relationships**: References navigation items and 3D objects

## State Transitions

### Cursor Effects
- `default` → `glow` (on interactive elements)
- `glow` → `morph` (on special interactions)
- Any state → `default` (on mouse leave)

### Theme Transitions
- `light` ↔ `dark` (user toggle)
- `auto` → `light`|`dark` (system preference change)

### Loading States
- `unloaded` → `loading` → `loaded` | `error`
- `error` → `retry` → `loading`