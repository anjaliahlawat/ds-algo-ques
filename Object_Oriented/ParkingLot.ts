//  Design a parking lot using object oriented principles.

class ParkingLot {
    spots: Map<number, ParkingSpot>
    tickets: Map<string, ParkingTicket>
    payments: PaymentService

    constructor() {
        this.spots =new Map();
        this.tickets = new Map();
    }

    getParkingSpot(vehicleType): ParkingTicket | null {
        const spot = Array.from(this.spots.values()).find(spot => spot.type === vehicleType && !spot.isOccupied);
        if (!spot) {
            console.log(`No available spots for vehicle type: ${vehicleType}`);
            return null
        }
        
        return this.issueTicket(spot.spotNumber);
    }

    issueTicket(spotNumber): ParkingTicket {
        const spot = this.spots.get(spotNumber)!;
        spot.setOccupied();
        this.spots.set(spotNumber, spot);
        
        const ticketId = `TICKET-${Date.now()}-${spotNumber}`;
        const ticket = new ParkingTicket(ticketId, spotNumber);
        this.tickets.set(ticketId, ticket);
        console.log(`Issued ticket ${ticketId} for spot ${spotNumber}`);
        return ticket;
    }

    exitParking(ticketId: string): void  {
        const ticket = this.tickets.get(ticketId);
        if (!ticket) {
            console.log(`Invalid ticket ID`);
            return;
        }

        console.log("Amount due:", ticket.calculateFee());

        const receipt = this.payments.payForTicket(ticketId, ticket.calculateFee());

        if (!!receipt) {
            console.log(`Payment successful for ticket ID: ${ticketId}`);
            const spot = this.spots.get(ticket.spotNumber)!;
            spot.setAvailable();
            this.spots.set(spot.spotNumber, spot);
    
            ticket.setExitTime(new Date());
            this.tickets.set(ticketId, ticket);
            console.log(`Vehicle exited from spot ${spot.spotNumber}`);
            return null;
        }
    }
}

class ParkingSpot {
    spotNumber: number
    isOccupied: boolean
    type: "Car" | "Bike" | "Truck"

    constructor(spotNumber: number, type: "Car" | "Bike" | "Truck") {
        this.spotNumber = spotNumber;
        this.isOccupied = false;
        this.type = type;
    }

    setOccupied(): void {
        this.isOccupied = true;
    }

    setAvailable(): void {
        this.isOccupied = false;
    }
}

class ParkingTicket {
    ticketId: string
    spotNumber: number
    entryTime: Date
    exitTime: Date | null

    constructor(ticketId: string, spotNumber: number) {
        this.ticketId = ticketId;
        this.spotNumber = spotNumber;
        this.entryTime = new Date();
        this.exitTime = null;
    }

    setEntryTime(entryTime: Date): void {
        this.entryTime = entryTime;
    }

    setExitTime(exitTime: Date): void {
        this.exitTime = exitTime;
    }

    setSpotNumber(spotNumber: number): void {
        this.spotNumber = spotNumber;
    }

    calculateFee(): number {
        const exitTime = this.exitTime ? this.exitTime : new Date();
        const durationInHours = Math.ceil((exitTime.getTime() - ticket.entryTime.getTime()) / (1000 * 60 * 60));
        const ratePerHour = 10;
        return durationInHours * ratePerHour;
    }
}

class Vehicle {
    vehicleType: "Car" | "Bike" | "Truck"

    constructor(vehicleType: "Car" | "Bike" | "Truck") {
        this.vehicleType = vehicleType;
    }

}

class PaymentService {
    paymentReceipts: Map<string, Receipt>


    payForTicket(ticketId: string, amount: number): Receipt {
        if (!this.processPayment(ticketId, amount)) {
            console.log(`Payment failed for ticket ID: ${ticketId}`);
            return null;
        }
        const receipt = new Receipt();
        receipt.id = `RECEIPT-${Date.now()}`;
        receipt.details = { ticketId, amount, status: "PAID" };
        this.paymentReceipts.set(ticketId, receipt);
        console.log(`Payment of $${amount} processed for ticket ID: ${ticketId}`);
        return receipt;
    }

    processPayment(ticketId: string, amount: number): boolean {
        // Simulate payment processing logic
        console.log(`Processing payment of $${amount} for ticket ID: ${ticketId}`);
        return true;
    }

}

class TicketService {
    
}

class Receipt {
    id: string
    details: { ticketId: string, amount: number, status: "PAID" | "PENDING" }
}

const parkingLot = new ParkingLot();
const ticket = parkingLot.getParkingSpot("Car");

parkingLot.exitParking(ticket.ticketId);