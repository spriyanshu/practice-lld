# Parking Lot System - Notes

## 🎯 Key Insights

- This is a classic object-oriented design problem
- Focus on proper abstraction and class relationships
- Consider using Factory pattern for vehicle creation
- Strategy pattern can be useful for different parking fee calculations

## 🏗️ Design Approach

### Core Classes to Consider

- `Vehicle` (abstract base class)
- `Car`, `Motorcycle`, `Truck` (concrete vehicle types)
- `ParkingSpot` (with different sizes)
- `ParkingLot` (main system)
- `Ticket` (for tracking parking sessions)
- `PaymentProcessor` (for handling fees)

### Design Patterns

- **Factory Pattern**: For creating different vehicle types
- **Strategy Pattern**: For different fee calculation strategies
- **Observer Pattern**: For notifying about spot availability changes

## 💡 Implementation Tips

1. Start with basic classes and relationships
2. Add complexity gradually (payment, multiple levels, etc.)
3. Consider thread safety for concurrent operations
4. Use enums for vehicle types and spot sizes
5. Keep pricing logic separate and configurable

## 🧪 Testing Strategy

- Test basic parking and exit flow
- Test edge cases (full parking lot)
- Test concurrent operations
- Verify fee calculations
- Test invalid scenarios

## ⚠️ Common Pitfalls

- Not handling concurrent access properly
- Making the design too complex initially
- Forgetting about edge cases like full parking lot
- Not separating concerns properly

## 📝 Interview Tips

- Start with clarifying requirements
- Draw class diagrams
- Discuss design patterns used
- Consider extensibility (new vehicle types, pricing models)
- Talk about scalability and performance

## 🔗 Related Problems

- Elevator Management System (scheduling and state management)
- Hotel Reservation System (resource allocation)
- Car Rental System (similar inventory management)

---

**Time Spent**: **\_  
**Difficulty Rating**: \_**/10  
**Key Learnings**: \_\_\_
