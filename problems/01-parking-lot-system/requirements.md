# Parking Lot System - Requirements Documentation

## 📋 Problem Overview

**Difficulty**: Easy  
**Time Limit**: 25min  
**Topics**: Object-oriented design, Design patterns (Factory, Strategy)

## 🎯 Business Context

A parking lot system manages vehicle entry, exit, and space allocation in facilities like malls or airports. This is one of the most common low-level design interview questions. The context involves modelling vehicles, parking spots, and ticketing mechanisms in an object-oriented way.

## 📝 Problem Statement

Design a parking lot system that can handle multiple levels and vehicle types. The system should support parking and retrieval of vehicles, tracking availability of parking spots, and handling payments or tickets for parking time.

## ✅ Functional Requirements

### Core Features

1. **Support parking of different vehicle types (cars, motorcycles, trucks) in appropriately sized spots**
2. **Assign parking spots when vehicles enter and mark them free when vehicles leave**
3. **Issue tickets or record entry time to calculate parking fees**
4. **Handle payments and exit processing (e.g., barriers or gates)**
5. **Provide APIs to query available spots by type and location**

## 🚫 Constraints & Assumptions

### Technical Constraints

- Limited number of spots per level and area (no overbooking)
- Vehicles cannot occupy multiple spots; one vehicle per spot
- Parking fee calculation based on duration or flat rates
- Concurrent vehicle arrivals/exits (thread safety may be required)
- Assume a relatively fixed size parking lot (no dynamic expansion in scope)

## 🎨 Design Patterns to Consider

### Primary Topics

- **Object-oriented design**: Consider how this applies to the problem
- **Design patterns (Factory, Strategy)**: Consider how this applies to the problem

### Secondary Topics

- **Concurrency control**: May be relevant for advanced implementation
- **Data structures (maps, heaps)**: May be relevant for advanced implementation

## 🧪 Test Cases to Consider

### Happy Path

1. Vehicle enters, gets assigned a spot, parks successfully
2. Vehicle exits, spot becomes available, payment processed
3. System tracks available spots correctly

### Edge Cases

1. Parking lot is full - no spots available
2. Invalid vehicle type for available spots
3. Multiple vehicles trying to park simultaneously

### Error Scenarios

1. Vehicle tries to exit without valid ticket
2. Payment processing fails
3. System tries to assign already occupied spot

## 📊 Success Criteria

- [ ] All functional requirements implemented
- [ ] Clean, maintainable code structure
- [ ] Proper error handling
- [ ] Thread safety (if applicable)
- [ ] Test coverage for main scenarios
- [ ] Time complexity within reasonable bounds

## 🔍 Questions to Clarify

1. What should happen when parking lot is full?
2. Are there specific performance requirements for spot assignment?
3. Should the system handle concurrent operations?
4. What level of error reporting is expected?

---

**Note**: Focus on implementing the core requirements first, then add enhancements if time permits.
