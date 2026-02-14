// Design an elevator system for a building with multiple floors. The system should handle requests from users to go to different floors, manage the movement of the elevator, and ensure efficient operation.

enum ButtonState {    
    PRESSED,
    RELEASED
}

enum Direction {
    UP,
    DOWN
}

enum ElevatorState {
    MOVING,
    IDLE
}

class Button {
    state: ButtonState;

    press() {}
}

class FloorRequestButton extends Button {
    direction: Direction;

    constructor(direction: Direction) {
        super();
        this.direction = direction;
    }
}

class Floor {
    floorNumber: number;
    upButton: ButtonState;
    downButton: ButtonState;
    floorRequestButtonUp: FloorRequestButton;

    constructor(floorNumber: number) {
        this.floorNumber = floorNumber;
        this.upButton = ButtonState.RELEASED;
        this.downButton = ButtonState.RELEASED;
    }

    onUpButtonPressed() {
        this.upButton = ButtonState.PRESSED;
    }

    onDownButtonPressed() {
        this.downButton = ButtonState.PRESSED;
    }

    requestElevator(manager: ElevatorManager, direction: Direction) {
        manager.handleExternalRequest(this.floorNumber, direction);
    }
}

class Elevator {
    id: number;
    currentFloor: number = 0;
    direction: Direction = Direction.UP;
    state: ElevatorState = ElevatorState.IDLE;

    private upQueue: number[] = []; // ascending order
    private downQueue: number[] = []; // descending order

    constructor(id: number) {
        this.id = id;
        this.currentFloor = 0;
        this.state = ElevatorState.IDLE;
        this.upQueue = [];
        this.downQueue = [];
    }

    addToUpQueue(requestedfloor: number) {
        this.upQueue.push(requestedfloor);
        this.upQueue.sort((a, b) => a - b);
    }

    addToDownQueue(requestedfloor: number) {
        this.downQueue.push(requestedfloor);
        this.downQueue.sort((a, b) => b - a);
    }

    addRequest(floorNumber: number) {
        if (floorNumber > this.currentFloor) {
            this.upQueue.push(floorNumber);
            this.upQueue.sort((a, b) => a - b);
        } else if (floorNumber < this.currentFloor) {
            this.downQueue.push(floorNumber);
            this.downQueue.sort((a, b) => b - a);
        }
    }

    start() {
        if (this.state === ElevatorState.IDLE) {
            this.state = ElevatorState.MOVING;
            this.processRequests();
        }
    }

    closeDoor() {
        console.log("Door is closing");
    }

    openDoor() {
        console.log("Door is opening");
    }

    moveTo(targetFloor: number) {
        this.currentFloor = targetFloor;
    }

    processRequests() {
        while (this.upQueue.length > 0 || this.downQueue.length > 0) {
            if (this.direction === Direction.UP && this.upQueue.length > 0) {
                this.moveTo(this.upQueue.shift());
                
            } else if (this.direction === Direction.DOWN && this.downQueue.length > 0) {
                this.moveTo(this.downQueue.shift());
            } else {
                this.switchDirection()
            }
        }
    }

    switchDirection() {
        this.direction = this.direction === Direction.UP ? Direction.DOWN : Direction.UP;
    }
}


class ElevatorManager {
    private elevators: Elevator[] = [];
    floors: Map<number, Floor>;
    queue: FloorRequestButton[];


    constructor(floorsCount: number = 5, totalElevators: number = 1) {
        this.elevators = [];
        this.floors = new Map();
        for (let i = 0; i < floorsCount; i++) {
            this.floors.set(i, new Floor(i));
        }

        for (let i = 0; i < totalElevators; i++) {
            this.elevators.push(new Elevator(i));
        }
    }

    handleExternalRequest(floorNumber: number, direction: Direction) {
        const elevator = this.selectBestElevator(floorNumber, direction);
        elevator.addRequest(floorNumber);
        elevator.start();
    }

    handleInternalRequest(requestedfloor: number, elevatorId: number) {
        const elevator = this.elevators.find(e => e.id === elevatorId)!;
       elevator.addRequest(requestedfloor);
       elevator.start();
    }

    private selectBestElevator(floor: number, direction: Direction): Elevator {
        let bestElevator = this.elevators[0];
        let bestScore = Number.MAX_VALUE;

        for (const elevator of this.elevators) {
            const score = this.calculateScore(elevator, floor, direction);
            if (score < bestScore) {
                bestScore = score;
                bestElevator = elevator;
            }
        }

        return bestElevator;
    }

    private calculateScore(
        elevator: Elevator,
        floor: number,
        direction: Direction
    ): number {
        let score = Math.abs(elevator.currentFloor - floor);

        if (elevator.state === ElevatorState.MOVING) score += 5;
        if (elevator.direction !== direction) score += 3;

        return score;
    }

    getFloor(floorNumber: number): Floor {
        return this.floors.get(floorNumber)!;
    }
}

const elevatorManager = new ElevatorManager();
// elevatorManager.requestElevator(3, Direction.UP);
