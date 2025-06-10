/**
 * Parking Lot System - TypeScript Implementation
 */
// 1. Support parking of different vehicle types (cars, motorcycles, trucks) in appropriately sized spots
// 2. Assign parking spots when vehicles enter and mark them free when vehicles leave
// 3. Issue tickets or record entry time to calculate parking fees
// 4. Handle payments and exit processing (e.g., barriers or gates)
// 5. Provide APIs to query available spots by type and location

// Technical Constraints
// 1. Limited number of spots per level and area (no overbooking)
// 2. Vehicles cannot occupy multiple spots; one vehicle per spot
// 3. Parking fee calculation based on duration or flat rates
// 4. Concurrent vehicle arrivals/exits (thread safety may be required)
// 5. Assume a relatively fixed size parking lot (no dynamic expansion in scope)

// Happy Path
// 1. vehicle enters, gets assigned a spot, parks successfully
// 2. Vehicle exits, spot becomes available, payment processed
// 3. System tracks available spots correctly
// Edge Cases
// 1. Parking lot is full - no spots available
// 2. Invalid vehicle type for available spots
// 3. Multiple vehicles trying to park simultaneously
// Error Scenarios
// 1. Vehicle tries to exit without valid ticket
// 2. Payment processing fails
// 3. System tries to assign already occupied spot

// listing classes
// 1. ParkingLot
// 2. Spot
// 3. Vehicle
// 4. Ticket

enum SpotType {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  TRUCK = 'TRUCK',
}

class ParkingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParkingError';
  }
}
class PaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

interface ITicket {
  getId(): string;
  getVehicle(): IVehicle;
  getSpot(): ISpot;
  totalHours(): number;
  getIsPaid(): boolean;
  markAsPaid(): void;
}
class Ticket implements ITicket {
  private id: string;
  private startTime: Date;
  private vehicle: IVehicle;
  private spot: ISpot;
  private isPaid: boolean;
  constructor(vehicle: IVehicle, spot: ISpot) {
    this.id = crypto.randomUUID();
    this.startTime = new Date();
    this.vehicle = vehicle;
    this.spot = spot;
    this.isPaid = false;
  }
  getId(): string {
    return this.id;
  }
  getVehicle(): IVehicle {
    return this.vehicle;
  }
  getSpot(): ISpot {
    return this.spot;
  }

  totalHours(): number {
    const diff = new Date().getTime() - this.startTime.getTime();
    const hours = Math.ceil(diff / (1000 * 60 * 60));
    return Math.max(hours, 1);
  }
  getIsPaid(): boolean {
    return this.isPaid;
  }
  markAsPaid(): void {
    this.isPaid = true;
  }
}

interface ISpot {
  getSpotId(): string;
  getIsOccupied(): boolean;
  getSpotType(): SpotType;
  getVehicle(): IVehicle | null;
  setVehicle(vehicle: IVehicle): void;
  freeSpot(): void;
}
class Spot implements ISpot {
  private id: string;
  private isOccupied: boolean;
  private type: SpotType;
  private vehicle: IVehicle | null;
  constructor(type: SpotType) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.isOccupied = false;
    this.vehicle = null;
  }

  getSpotId(): string {
    return this.id;
  }
  getIsOccupied(): boolean {
    return this.isOccupied;
  }
  getSpotType(): SpotType {
    return this.type;
  }
  getVehicle(): IVehicle | null {
    return this.vehicle;
  }

  setVehicle(vehicle: IVehicle): void {
    if (this.isOccupied) {
      throw new ParkingError('Spot is already occupied');
    }
    this.vehicle = vehicle;
    this.isOccupied = true;
  }

  freeSpot(): void {
    this.isOccupied = false;
    this.vehicle = null;
  }
}

interface IVehicle {
  getId(): string;
  getType(): SpotType;
  getLicensePlate(): string;
}
class Vehicle implements IVehicle {
  private id: string;
  private type: SpotType;
  private licensePlate: string;
  constructor(type: SpotType, licensePlate: string) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.licensePlate = licensePlate;
  }
  getId(): string {
    return this.id;
  }
  getType(): SpotType {
    return this.type;
  }
  getLicensePlate(): string {
    return this.licensePlate;
  }
}

interface ITicketService {
  issueTicket(vehicle: IVehicle, spot: ISpot): ITicket;
  calculateFee(ticket: ITicket): number;
}
class TicketService implements ITicketService {
  private readonly rate: Record<SpotType, number>;
  constructor() {
    this.rate = {
      [SpotType.CAR]: 10,
      [SpotType.MOTORCYCLE]: 5,
      [SpotType.TRUCK]: 20,
    };
  }
  issueTicket(vehicle: IVehicle, spot: ISpot): ITicket {
    return new Ticket(vehicle, spot);
  }

  calculateFee(ticket: ITicket): number {
    const hours = ticket.totalHours();
    const rate = this.rate[ticket.getVehicle().getType()];
    return hours * rate;
  }
}

interface IPaymentService {
  processPayment(ticket: ITicket, amount: number): boolean;
}
class PaymentService implements IPaymentService {
  processPayment(ticket: ITicket, amount: number): boolean {
    console.log(
      `Processing payment of ₹${amount} for Ticket ID: ${ticket.getId()}`
    );

    // Simulate potential payment failure (5% chance)
    if (Math.random() < 0.05) {
      throw new PaymentError('Payment processing failed');
    }

    return true;
  }
}

interface ISpotManager {
  addSpot(spot: ISpot): void;
  assignSpotAndIssueTicket(vehicle: IVehicle): ITicket;
  freeSpot(ticket: ITicket): void;
  makePayment(ticket: ITicket): ITicket;
}
class SpotManager implements ISpotManager {
  private spots: Map<string, ISpot> = new Map();
  private tickets: Map<string, ITicket> = new Map();
  private ticketService: ITicketService;
  private paymentService: IPaymentService;
  constructor(ticketService: ITicketService, paymentService: IPaymentService) {
    this.ticketService = ticketService;
    this.paymentService = paymentService;
  }
  addSpot(spot: ISpot): void {
    try {
      if (this.spots.has(spot.getSpotId())) {
        throw new ParkingError('Spot with same id already exists');
      }
      this.spots.set(spot.getSpotId(), spot);
    } catch (error) {
      console.log('error occurred while adding spot', error);
      throw error;
    }
  }

  private getAvailableSpotsByVehicle(vehicle: IVehicle): ISpot[] {
    return Array.from(this.spots.values()).filter(
      (spot) =>
        !spot.getIsOccupied() && spot.getSpotType() === vehicle.getType()
    ) as ISpot[];
  }
  assignSpotAndIssueTicket(vehicle: IVehicle): ITicket {
    try {
      const availableSpots = this.getAvailableSpotsByVehicle(vehicle);
      if (availableSpots.length === 0) {
        throw new ParkingError('No available spots');
      }
      const ticket = this.ticketService.issueTicket(vehicle, availableSpots[0]);
      this.tickets.set(ticket.getId(), ticket);
      availableSpots[0].setVehicle(vehicle);

      return ticket;
    } catch (error) {
      console.log(
        'error occurred while assigning spot and issuing ticket',
        error
      );
      throw error;
    }
  }
  freeSpot(ticket: ITicket): void {
    try {
      const ticketToFree = this.tickets.get(ticket.getId());
      if (!ticketToFree) {
        throw new ParkingError('Ticket not found');
      }
      const spot = this.spots.get(ticketToFree.getSpot().getSpotId());
      if (!spot) {
        throw new ParkingError('Spot not found');
      }
      if (!ticketToFree.getIsPaid()) {
        throw new PaymentError('Ticket is not paid');
      }
      spot.freeSpot();
      this.tickets.delete(ticketToFree.getId());
    } catch (error) {
      console.log(
        'error occurred while freeing spot and removing ticket',
        error
      );
      throw error;
    }
  }
  makePayment(ticket: ITicket): ITicket {
    try {
      const fee = this.ticketService.calculateFee(ticket);
      const isPaymentProcessed = this.paymentService.processPayment(
        ticket,
        fee
      );
      if (!isPaymentProcessed) {
        throw new PaymentError('Payment failed');
      }
      ticket.markAsPaid();

      return ticket;
    } catch (error) {
      console.log('error occurred while making payment', error);
      throw error;
    }
  }
}

interface IParkingLot {
  addSpot(spot: ISpot): void;
  assignSpotAndIssueTicket(vehicle: IVehicle): ITicket;
  freeSpot(ticket: ITicket): void;
  makePayment(ticket: ITicket): ITicket;
}
class ParkingLot implements IParkingLot {
  private static instance: ParkingLot;
  private spotManager: ISpotManager;
  private constructor(spotManager: ISpotManager) {
    this.spotManager = spotManager;
  }
  static getInstance(spotManager: ISpotManager): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot(spotManager);
    }
    return ParkingLot.instance;
  }
  addSpot(spot: ISpot): void {
    try {
      this.spotManager.addSpot(spot);
    } catch (error) {
      console.log('error occurred while adding spot', error);
      throw error;
    }
  }
  assignSpotAndIssueTicket(vehicle: IVehicle): ITicket {
    try {
      return this.spotManager.assignSpotAndIssueTicket(vehicle);
    } catch (error) {
      console.log(
        'error occurred while assigning spot and issuing ticket',
        error
      );
      throw error;
    }
  }
  makePayment(ticket: ITicket): ITicket {
    try {
      return this.spotManager.makePayment(ticket);
    } catch (error) {
      console.log('error occurred while making payment', error);
      throw error;
    }
  }
  freeSpot(ticket: ITicket): void {
    try {
      this.spotManager.freeSpot(ticket);
    } catch (error) {
      console.log(
        'error occurred while freeing spot and removing ticket',
        error
      );
      throw error;
    }
  }
}

// Example usage
const ticketService = new TicketService();
const paymentService = new PaymentService();
const spotManager = new SpotManager(ticketService, paymentService);
const parkingLot = ParkingLot.getInstance(spotManager);

const car = new Vehicle(SpotType.CAR, '123456');
const motorcycle = new Vehicle(SpotType.MOTORCYCLE, '123457');
const truck = new Vehicle(SpotType.TRUCK, '123458');

const carSpot = new Spot(SpotType.CAR);
const motorcycleSpot = new Spot(SpotType.MOTORCYCLE);
const truckSpot = new Spot(SpotType.TRUCK);

parkingLot.addSpot(carSpot);
parkingLot.addSpot(motorcycleSpot);
parkingLot.addSpot(truckSpot);

const carTicket = parkingLot.assignSpotAndIssueTicket(car);
const motorcycleTicket = parkingLot.assignSpotAndIssueTicket(motorcycle);
const truckTicket = parkingLot.assignSpotAndIssueTicket(truck);

parkingLot.makePayment(carTicket!);
parkingLot.makePayment(motorcycleTicket!);
parkingLot.makePayment(truckTicket!);

parkingLot.freeSpot(carTicket!);
parkingLot.freeSpot(motorcycleTicket!);
parkingLot.freeSpot(truckTicket!);

console.log('carTicket', carTicket);
console.log('motorcycleTicket', motorcycleTicket);
console.log('truckTicket', truckTicket);

// TODO: To add the async-mutex for the concurrent requests, breakit down into smaller functions and mutiple file, write the test cases for the same
