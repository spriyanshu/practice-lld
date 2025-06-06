# Publish-Subscribe System - Requirements Documentation

## 📋 Problem Overview

**Difficulty**: Medium  
**Time Limit**: 35min  
**Topics**: Observer pattern, Message queuing

## 🎯 Business Context

A publish-subscribe messaging system allows publishers to broadcast messages to multiple subscribers based on topics. Designing a pub-sub system assesses understanding of messaging patterns, decoupling, and observers (Interviewed as a sample messaging design problem:contentReference[oaicite:15]{index=15}).

## 📝 Problem Statement

Design a publish-subscribe system. The system should allow publishers to publish messages on topics and subscribers to subscribe to topics. When a message is published, all subscribers to that topic should receive the message.

## ✅ Functional Requirements

### Core Features
1. **Create and manage topics (channels) for messages**
2. **Allow clients to subscribe/unsubscribe to specific topics**
3. **Publish messages on a topic, delivering them to all active subscribers of that topic**
4. **Ensure messages are delivered in order for each topic (optional)**
5. **Handle multiple topics and high volumes of messages**

## 🚫 Constraints & Assumptions

### Technical Constraints
- Assume an in-memory message broker (no persistence or broker failure handling)
- Subscribers must actively listen (no message queuing for offline clients)
- No need for authentication or access control on topics
- Delivery guarantees (at least once vs exactly once) can be simplified to best effort
- Focus on core pub-sub behavior (ignore scaling/distribution issues)

## 🎨 Design Patterns to Consider

### Primary Topics
- **Observer pattern**: Consider how this applies to the problem
- **Message queuing**: Consider how this applies to the problem

### Secondary Topics
- **Asynchronous processing**: May be relevant for advanced implementation
- **Fault tolerance (basic)**: May be relevant for advanced implementation

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