# Elevator Management System - Requirements Documentation

## 📋 Problem Overview

**Difficulty**: Medium  
**Time Limit**: 35min  
**Topics**: State pattern, Scheduling (Queue)

## 🎯 Business Context

An elevator management system controls multiple elevator cars in a building. It is a common interview problem to model elevator logic (car selection, movement):contentReference[oaicite:9]{index=9}. The design involves queues, scheduling, and state management for elevators.

## 📝 Problem Statement

Design an elevator system for a building. The system should manage several elevator cars, accept floor requests (up/down) from users, and dispatch the best elevator to service each request efficiently.

## ✅ Functional Requirements

### Core Features
1. **Handle pick-up requests from floors (up or down buttons) and drop-off requests inside elevators (floor selection)**
2. **Dispatch elevators to requested floors based on current state (idle, moving, direction)**
3. **Support multiple elevators with independent controllers**
4. **Respond to simultaneous requests and optimize elevator movement (e.g., nearest elevator)**
5. **Provide status updates on elevator location and direction**

## 🚫 Constraints & Assumptions

### Technical Constraints
- Limited number of elevator cars
- Elevators have a maximum capacity (number of people)
- Ignore emergency modes (firefighters' mode) for simplicity
- Assume all elevator calls are in the same system (no external commands)
- Concurrent requests handled sequentially in design assumptions

## 🎨 Design Patterns to Consider

### Primary Topics
- **State pattern**: Consider how this applies to the problem
- **Scheduling (Queue)**: Consider how this applies to the problem

### Secondary Topics
- **Threading/Concurrency**: May be relevant for advanced implementation
- **Optimization algorithms**: May be relevant for advanced implementation

## 🧪 Test Cases to Consider

### Happy Path
1. Basic functionality works as expected
2. Multiple operations work in sequence
3. System handles normal load

### Edge Cases
1. Empty/null inputs
2. Boundary conditions
3. Maximum capacity scenarios

### Error Scenarios
1. Invalid operations
2. Resource conflicts
3. System constraints violations

## 📊 Success Criteria

- [ ] All functional requirements implemented
- [ ] Clean, maintainable code structure
- [ ] Proper error handling
- [ ] Thread safety (if applicable)
- [ ] Test coverage for main scenarios
- [ ] Time complexity within reasonable bounds

## 🔍 Questions to Clarify

1. What should happen in edge cases not explicitly mentioned?
2. Are there specific performance requirements?
3. Should the system handle concurrent operations?
4. What level of error reporting is expected?

---
**Note**: Focus on implementing the core requirements first, then add enhancements if time permits.