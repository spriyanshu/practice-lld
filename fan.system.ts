// State Interface
interface FanState {
  pressButton(): void;
}

// Context
class Fan {
  private currentState: FanState;

  constructor() {
    // Start with Off state
    this.currentState = new OffState(this);
  }

  setState(state: FanState) {
    this.currentState = state;
  }

  pressButton() {
    this.currentState.pressButton();
  }
}

// Concrete States
class OffState implements FanState {
  constructor(private fan: Fan) {}

  pressButton(): void {
    console.log('Turning fan to LOW speed.');
    this.fan.setState(new LowState(this.fan));
  }
}

class LowState implements FanState {
  constructor(private fan: Fan) {}

  pressButton(): void {
    console.log('Turning fan to HIGH speed.');
    this.fan.setState(new HighState(this.fan));
  }
}

class HighState implements FanState {
  constructor(private fan: Fan) {}

  pressButton(): void {
    console.log('Turning fan OFF.');
    this.fan.setState(new OffState(this.fan));
  }
}

// --- Client code ---
const fan = new Fan();

fan.pressButton(); // Turning fan to LOW speed.
fan.pressButton(); // Turning fan to HIGH speed.
fan.pressButton(); // Turning fan OFF.
fan.pressButton(); // Turning fan to LOW speed.
