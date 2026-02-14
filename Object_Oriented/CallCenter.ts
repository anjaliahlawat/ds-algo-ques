function randomBool(): boolean {
  return Math.random() < 0.5;
}

enum Employees {
    Respondent = 'Respondent',
    Manager = 'Manager',
    Director = 'Director'
}

enum CallStatus {
    Incoming = 'Incoming',
    Ongoing = 'Ongoing',
    Dispatched = 'Dispatched',
    Dropped = 'Dropped'
}

enum EmployeeStatus {
    Available = 'Available',
    Busy = 'Busy',
    Offline = 'Offline'
}

type call = {
    callId: string;
    status: CallStatus;
}

class Employee {
    id: string
    name: string
    status: EmployeeStatus

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.status = EmployeeStatus.Available
    }

    async handleCall(call) {
        this.status = EmployeeStatus.Busy

        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 2000) + 1000));

        const resolved = Math.random() < 0.7;

        if (resolved) {
            console.log(`Call ${call.callId} resolved by ${this.name}`);
        } else {
            console.log(`Call ${call.callId} could not be resolved by ${this.name}`);
        }

        this.status = EmployeeStatus.Available
        return resolved;
    }

    setStatus(status: EmployeeStatus): void {
        this.status = status
    }
}

class Respondent extends Employee {
  get rank() {
    return Employees.Respondent;
  }
}

class Manager extends Employee {
  get rank() {
    return Employees.Manager;
  }
}

class Director extends Employee {
  get rank() {
    return Employees.Director;
  }
}
 
class Callcenter {
    employees: Employee[] = []
    queue: call[] = []

    constructor() {
        this.employees = []
        this.queue = []
    }

    addEmployee(emp: Employee): void {
        this.employees.push(emp)
    }

    dispatchCall(call: call) {
        let handler = this.findFreeEmployee(Respondent) || this.findFreeEmployee(Manager) || this.findFreeEmployee(Director);

        if (handler) {
            this.processCall(handler, call)
        } else {
            console.log(`All employees are busy. Call ${call.callId} is queued.`);
            this.queue.push(call)
        }
    }

    findFreeEmployee(type) {
        return this.employees.find(emp => emp instanceof type && emp.status === EmployeeStatus.Available);
    }

    async processCall(handler, call) {
        const resolved = await handler.handleCall(call)

        if (!resolved) {
            if (handler.rank === Employees.Respondent) {
                this.dispatchCall(call)
            } else if (handler.rank === Employees.Manager) {
                this.dispatchCall(call)
            } else {
                console.log(`Call ${call.callId} could not be resolved even by Director. Dropping the call.`);
            }
        }

        if (this.queue.length > 0 && handler.status === EmployeeStatus.Available) {
            const nextCall = this.queue.shift()
            this.processCall(handler, nextCall)
        }
    }
}

const callcenter = new Callcenter()
callcenter.addEmployee(new Respondent('1', 'Anjali'))
callcenter.addEmployee(new Respondent('2', 'Ankita'))
callcenter.addEmployee(new Manager('3', 'Ankur'))
callcenter.addEmployee(new Director('4', 'Ajay'))

// if (callcenter.isIncomingCall()) {
//     callcenter.dispatchCall()
// }
