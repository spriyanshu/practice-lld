# Car Rental System - Requirements Documentation

## 📋 Problem Overview

**Difficulty**: Medium  
**Time Limit**: 35min  
**Topics**: Booking/reservation system, Inventory management

## 🎯 Business Context

A car rental service manages vehicle availability and reservations. This problem tests inventory management and reservation flows, similar to hotel booking logic. It's commonly asked to assess handling of fleet management and bookings (A typical LLD question:contentReference[oaicite:14]{index=14}).

## 📝 Problem Statement

Design a car rental system. The system should manage a fleet of vehicles, allow customers to reserve a vehicle for a time range, and track vehicle availability.

## ✅ Functional Requirements

### Core Features
1. **Register vehicles in the fleet with details (model, type, location)**
2. **Check availability of cars for requested date range and type**
3. **Create reservations that assign a specific car to a customer for the rental period**
4. **Return vehicles (end of rental) and update availability**
5. **Handle cancellations and make the vehicle available again**

## 🚫 Constraints & Assumptions

### Technical Constraints
- Each vehicle can only be rented to one customer at a time
- Fixed locations: vehicles belong to specific branches (no cross-branch rentals)
- Assume no maintenance downtime (every car is available if not rented)
- Prices per day are fixed based on car type
- Concurrency: multiple customers may try to book the same car

## 🎨 Design Patterns to Consider

### Primary Topics
- **Booking/reservation system**: Consider how this applies to the problem
- **Inventory management**: Consider how this applies to the problem

### Secondary Topics
- **Concurrency**: May be relevant for advanced implementation
- **Exception handling**: May be relevant for advanced implementation

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