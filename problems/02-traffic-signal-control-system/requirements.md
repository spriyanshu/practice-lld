# Traffic Signal Control System - Requirements Documentation

## 📋 Problem Overview

**Difficulty**: Easy  
**Time Limit**: 25min  
**Topics**: State machine design, Event-driven architecture

## 🎯 Business Context

Managing intersection traffic is critical for city planning. An interview classic is designing a traffic light controller for a junction. This involves modelling signals, timers, and rules for traffic flow.

## 📝 Problem Statement

Design a traffic signal control system to manage traffic at a multi-lane intersection. The system should control light signals (red, yellow, green) for each direction, and switch signals based on configurable durations or sensor inputs.

## ✅ Functional Requirements

### Core Features

1. **Coordinate traffic lights for all directions (e.g., North-South, East-West) to ensure no conflicting green signals**
2. **Allow configuration of signal cycles and timings for each direction**
3. **Incorporate emergency mode (e.g., all lights red or allow special vehicles)**
4. **Handle pedestrian crossing signals and buttons**
5. **Provide interfaces to simulate time progression and change signals accordingly**

## 🚫 Constraints & Assumptions

### Technical Constraints

- Avoid collisions by not allowing perpendicular green signals simultaneously
- Assume fixed intersection layout with predefined directions
- Sensors may not always detect vehicles; default to timer-based switching
- Support for real-time updates to timing (e.g., rush hour adjustments)
- Concurrency: simulate independent signal controllers per direction

## 🎨 Design Patterns to Consider

### Primary Topics

- **State machine design**: Consider how this applies to the problem
- **Event-driven architecture**: Consider how this applies to the problem

### Secondary Topics

- **Concurrency**: May be relevant for advanced implementation
- **Scheduling/Timers**: May be relevant for advanced implementation

## 🧪 Test Cases to Consider

### Happy Path

1. Normal signal cycling works correctly
2. Emergency mode activates properly
3. Pedestrian signals function as expected

### Edge Cases

1. Power failure and recovery
2. Sensor malfunction scenarios
3. Conflicting emergency signals

### Error Scenarios

1. Timer malfunction
2. Invalid configuration updates
3. System deadlock situations

## 📊 Success Criteria

- [ ] All functional requirements implemented
- [ ] Clean, maintainable code structure
- [ ] Proper error handling
- [ ] Thread safety (if applicable)
- [ ] Test coverage for main scenarios
- [ ] Time complexity within reasonable bounds

## 🔍 Questions to Clarify

1. How should emergency mode be triggered and handled?
2. Are there specific timing constraints for signal changes?
3. Should the system handle sensor input or just timer-based operation?
4. What level of error reporting is expected?

---

**Note**: Focus on implementing the core requirements first, then add enhancements if time permits.
