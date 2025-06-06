# Common Design Patterns in LLD Problems

This document outlines the most frequently used design patterns in Low Level Design interview problems, with examples and use cases.

## 🏗️ Creational Patterns

### 1. Factory Pattern

**Use Cases**: Creating objects without specifying their exact class
**Common in**: Parking Lot (Vehicle creation), Vending Machine (Product creation)

```python
class VehicleFactory:
    @staticmethod
    def create_vehicle(vehicle_type, license_plate):
        if vehicle_type == "CAR":
            return Car(license_plate)
        elif vehicle_type == "MOTORCYCLE":
            return Motorcycle(license_plate)
        # ...
```

### 2. Singleton Pattern

**Use Cases**: Ensuring only one instance exists
**Common in**: System managers, configuration classes

```python
class ParkingLotManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

### 3. Builder Pattern

**Use Cases**: Constructing complex objects step by step
**Common in**: Task creation, Order building

```python
class TaskBuilder:
    def __init__(self):
        self.task = Task()

    def set_title(self, title):
        self.task.title = title
        return self

    def set_priority(self, priority):
        self.task.priority = priority
        return self

    def build(self):
        return self.task
```

## 🎭 Behavioral Patterns

### 4. Observer Pattern

**Use Cases**: Notifying multiple objects about state changes
**Common in**: Task Management (notifications), Auction System (bid updates)

```python
class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def notify(self, event):
        for observer in self._observers:
            observer.update(event)

class TaskNotifier(Subject):
    def task_updated(self, task):
        self.notify(f"Task {task.id} updated")
```

### 5. State Pattern

**Use Cases**: Objects that change behavior based on internal state
**Common in**: Vending Machine, ATM, Traffic Signals

```python
class VendingMachineState(ABC):
    @abstractmethod
    def insert_coin(self, machine, coin):
        pass

class IdleState(VendingMachineState):
    def insert_coin(self, machine, coin):
        machine.add_coin(coin)
        machine.set_state(HasMoneyState())

class VendingMachine:
    def __init__(self):
        self._state = IdleState()

    def set_state(self, state):
        self._state = state
```

### 6. Strategy Pattern

**Use Cases**: Selecting algorithms at runtime
**Common in**: Payment processing, pricing strategies

```python
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        return f"Paid ${amount} using credit card"

class PaymentProcessor:
    def __init__(self, strategy):
        self._strategy = strategy

    def process_payment(self, amount):
        return self._strategy.pay(amount)
```

### 7. Command Pattern

**Use Cases**: Encapsulating requests as objects, undo/redo functionality
**Common in**: Text Editor, Remote Control

```python
class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

class InsertTextCommand(Command):
    def __init__(self, editor, text, position):
        self.editor = editor
        self.text = text
        self.position = position

    def execute(self):
        self.editor.insert(self.text, self.position)

    def undo(self):
        self.editor.delete(self.position, len(self.text))
```

## 🏛️ Structural Patterns

### 8. Adapter Pattern

**Use Cases**: Making incompatible interfaces work together
**Common in**: External payment gateways, third-party integrations

```python
class PaymentGatewayAdapter:
    def __init__(self, external_gateway):
        self.gateway = external_gateway

    def process_payment(self, amount, card):
        # Adapt our interface to external gateway's interface
        return self.gateway.charge(card.number, amount * 100)  # Convert to cents
```

### 9. Decorator Pattern

**Use Cases**: Adding behavior to objects dynamically
**Common in**: Feature additions, middleware

```python
class Task:
    def __init__(self, description):
        self.description = description

    def get_description(self):
        return self.description

class UrgentTaskDecorator:
    def __init__(self, task):
        self.task = task

    def get_description(self):
        return f"URGENT: {self.task.get_description()}"
```

## 🗂️ Problem-Pattern Mapping

| Problem           | Primary Patterns  | Secondary Patterns  |
| ----------------- | ----------------- | ------------------- |
| Parking Lot       | Factory, Strategy | Observer, State     |
| Traffic Signal    | State             | Observer, Strategy  |
| Vending Machine   | State, Factory    | Strategy            |
| ATM Machine       | State, Strategy   | Command             |
| Task Management   | Observer, Factory | Decorator, Command  |
| LRU Cache         | -                 | Strategy (eviction) |
| Text Editor       | Command           | Memento, Observer   |
| Elevator System   | State, Strategy   | Observer            |
| Movie Booking     | Factory, Strategy | Observer, State     |
| Hotel Reservation | Factory, Strategy | Observer            |

## 💡 Pattern Selection Guidelines

### When to use Factory Pattern

- Creating objects of different types based on input
- Want to decouple object creation from usage
- Need to support new types without changing existing code

### When to use Observer Pattern

- Multiple objects need to be notified of changes
- Loose coupling between subject and observers
- Event-driven architecture

### When to use State Pattern

- Object behavior changes significantly based on state
- Many conditional statements based on object state
- State transitions are well-defined

### When to use Strategy Pattern

- Multiple ways to perform the same task
- Want to switch algorithms at runtime
- Eliminate conditional statements for algorithm selection

## 🚫 Common Anti-Patterns to Avoid

### 1. God Object

- **Problem**: Single class doing too much
- **Solution**: Use composition and single responsibility principle

### 2. Tight Coupling

- **Problem**: Classes directly dependent on concrete implementations
- **Solution**: Use interfaces and dependency injection

### 3. Copy-Paste Programming

- **Problem**: Duplicating similar code
- **Solution**: Extract common functionality into base classes or utilities

### 4. Magic Numbers/Strings

- **Problem**: Hard-coded values throughout code
- **Solution**: Use constants and configuration

## 🎯 Interview Tips

1. **Start Simple**: Begin with basic implementation, then add patterns where they make sense
2. **Justify Choices**: Explain why you chose a specific pattern
3. **Consider Trade-offs**: Discuss pros/cons of your design decisions
4. **Extensibility**: Show how your design can be extended for new requirements
5. **SOLID Principles**: Ensure your design follows SOLID principles

---

Remember: Patterns are tools to solve problems, not goals in themselves. Use them when they add value, not just for the sake of using them.
