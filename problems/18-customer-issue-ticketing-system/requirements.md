# Customer Issue Ticketing System - Requirements Documentation

## 📋 Problem Overview

**Difficulty**: Medium  
**Time Limit**: 35min  
**Topics**: Workflow design, State management

## 🎯 Business Context

A customer support ticketing system (issue resolution) tracks customer problems and support workflows. It is a common LLD question:contentReference[oaicite:16]{index=16}, involving classes for tickets, users (agents/customers), and statuses.

## 📝 Problem Statement

Design a customer issue ticketing system. The system should allow creating support tickets, assigning them to support agents, and tracking resolution status.

## ✅ Functional Requirements

### Core Features
1. **Create a support ticket with a description, priority, and customer details**
2. **Assign or reassign tickets to support agents**
3. **Update ticket status (e.g., Open, In Progress, Resolved, Closed)**
4. **Add notes or communication logs to a ticket**
5. **Search or filter tickets by status, priority, or assignee**

## 🚫 Constraints & Assumptions

### Technical Constraints
- Each ticket is handled by at most one agent at a time
- Priority levels (low, medium, high) are predefined
- Tickets have unique IDs and timestamps
- Assume simple SLA (e.g., resolution due date) is out of scope
- Concurrency: multiple agents may update different tickets simultaneously

## 🎨 Design Patterns to Consider

### Primary Topics
- **Workflow design**: Consider how this applies to the problem
- **State management**: Consider how this applies to the problem

### Secondary Topics
- **Notification/Email integration**: May be relevant for advanced implementation
- **Data querying**: May be relevant for advanced implementation

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