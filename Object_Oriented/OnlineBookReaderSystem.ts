//  Design an online book reader system using object oriented principles.

enum Genre {
    Fiction = 'Fiction',
    NonFiction = 'NonFiction',
    Science = 'Science',
    History = 'History',
    Biography = 'Biography',
    Fantasy = 'Fantasy',
    Mystery = 'Mystery'
}


class Book {
    id: string;
    title: string;
    genre: Genre;
    author: string;
    isbn: string;
    publicationYear: number;
    content: string;
    price: number;

    constructor(id: string, title: string, genre: Genre, author: string, isbn: string, publicationYear: number, content: string, price: number) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.isbn = isbn;
        this.publicationYear = publicationYear;
        this.content = content;
        this.price = price;
    }

    getContent(): string {
        return this.content;
    }

    getBookDetails(): Book {
        return this
    }
}

class BuyBookService {
    private catalog: BooksCatalog;
    private paymentService: PaymentService = new PaymentService();

    constructor(catalog: BooksCatalog, paymentService: PaymentService) {
        this.catalog = catalog;
        this.paymentService = paymentService;
    }

    buyBook(user: User, bookId: string): void {
        const book = this.catalog.getBooks().find(b => b.id === bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        this.paymentService.charge(user.getUserDetails().id, book.price);
        user.saveBookToLibrary(book, AccessType.Owned);
        console.log(`User ${user.getUserDetails().username} bought book ${book.title} successfully.`);
    }

    borrowBook(user: User, bookId: string): void {
        const book = this.catalog.getBooks().find(b => b.id === bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        user.saveBookToLibrary(book, AccessType.Borrowed);
        console.log(`User ${user.getUserDetails().username} borrowed book ${book.title} successfully.`);
    }
}

class BooksCatalog {
    private books: Map<string, Book> = new Map();

    addBook(book: Book): void {
        this.books.set(book.id, book);
    }

    removeBook(bookId: string): void {
        this.books.delete(bookId);
    }

    getBooks(genre?: Genre): Book[] {
        if (genre) {
            return Array.from(this.books.values()).filter(book => book.genre === genre);
        }
        return Array.from(this.books.values());
    }

    searchBooks(query: string): Book[] {
        return Array.from(this.books.values()).filter(book => book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase()));
    }

}

class User {
    private accountDetails: UserAccountDetails;
    public subscription: Subscription | null = null;
    public library: UserLibrary = new UserLibrary();
    public readingSessionManager: ReadingSessionManager = new ReadingSessionManager();

    constructor(accountDetails: UserAccountDetails) {
        this.accountDetails = accountDetails;
    }

    getUserDetails(): UserAccountDetails {
        return this.accountDetails;
    }

    attachSubscription(subscription: Subscription): void {
        this.subscription = subscription;
    }

    saveBookToLibrary(book: Book, status: AccessType): void {
        const bookDetails = new UserBookDetails(book.id, status);

        if (status === AccessType.Borrowed) {
            this.library.addBorrowedBook(bookDetails);
            return;
        }
        this.library.addOwnedBook(bookDetails);
    }

    startReadingSession(bookId: string): void {
        const session = new ReadingSession(bookId);

        this.readingSessionHistory.startSession(this.accountDetails.id, session);
    }
}

enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED"
}

class Subscription {
    userId: string;
    plan: SubscriptionPlan;
    startDate: Date
    status: SubscriptionStatus

    constructor(userId: string, plan: SubscriptionPlan) {
        this.userId = userId;
        this.plan = plan;
        this.startDate = new Date();
        this.status = SubscriptionStatus.ACTIVE;
    }

    cancelSubscription(): void {
        this.status = SubscriptionStatus.CANCELLED;
    }
}

class SubscriptionService {
    private plans: Map<string, SubscriptionPlan> = new Map();
    private paymentService: PaymentService = new PaymentService();

    constructor(plans: SubscriptionPlan[], paymentService: PaymentService) {
        this.plans = new Map(plans.map(plan => [plan.id, plan]));
        this.paymentService = paymentService;
    }

    subscribeUser(user: User, planId: string): void {
        const plan = this.plans.get(planId);
        if (!plan) {
            throw new Error("Invalid subscription plan");
        }

        if (user.subscription && user.subscription.status === SubscriptionStatus.ACTIVE) {
            throw new Error("User already has an active subscription");
        }

        const paymentSuccess = this.paymentService.charge(user.getUserDetails().username, plan.price);
        if (!paymentSuccess) {
            throw new Error("Payment failed");
        }
        const subscription = new Subscription(user.getUserDetails().id, plan);

        user.attachSubscription(subscription);
        console.log(`User ${user.getUserDetails().username} subscribed to plan ${plan.planName} successfully.`); 
    }

    cancelUserSubscription(user: User): void {
        if (!user.subscription || user.subscription.status !== SubscriptionStatus.ACTIVE) {
            throw new Error("No active subscription to cancel");
        }
        user.subscription.cancelSubscription();
        console.log(`User ${user.getUserDetails().username} subscription cancelled successfully.`);
    }
}

class SubscriptionPlan {
    id: string
    planName: string;
    price: number;
    type: 'Monthly' | 'Yearly';
    maxBooksBorrowedAllowed: number;

    constructor(id: string, planName: string, price: number, type: 'Monthly' | 'Yearly', maxBooksBorrowedAllowed: number) {
        this.id = id;
        this.planName = planName;
        this.price = price;
        this.type = type;
        this.maxBooksBorrowedAllowed = maxBooksBorrowedAllowed;
    }
}

class PaymentService {
  charge(userId: string, amount: number): boolean {
    console.log(`Charging user ${userId} amount $${amount}`);
    return true; // simulate success
  }
}

class UserLibrary {
    private ownedBooks: Map<string, UserBookDetails> = new Map(); 
    private borrowedBooks: Map<string, UserBookDetails> = new Map();

    hasAccessToBook(bookId: string): boolean {
        return this.ownedBooks.has(bookId) || this.borrowedBooks.has(bookId);
    }

    addOwnedBook(bookDetails: UserBookDetails): void {
        this.ownedBooks.set(bookDetails.bookId, bookDetails);
    }

    addBorrowedBook(bookDetails: UserBookDetails): void {
        this.borrowedBooks.set(bookDetails.bookId, bookDetails);
    }

    getOwnedBooks(): UserBookDetails[] {
        return Array.from(this.ownedBooks.values());
    }

    getBorrowedBooks(): UserBookDetails[] {
        return Array.from(this.borrowedBooks.values());
    }
}

enum AccessType {
    Owned = 'Owned',
    Borrowed = 'Borrowed'
}

class UserBookDetails {
    bookId: string;
    accessType: AccessType;
    bookmarks: number[];
    hightlights: Map<number, HighlightDetails>;

    constructor(bookId: string, accessType: AccessType) {
        this.bookId = bookId;
        this.accessType = accessType;
        this.bookmarks = [];
        this.hightlights = new Map();
    }
}

class ReadingSession {
    private bookId: string
    public currentPage: number;
    public position: number[];
    public startTime: Date;
    public endTime: Date | null = null;

    constructor(bookId: string, currentPage: number = 1, position: number[] = [0,0], startTime: Date) {
        this.bookId = bookId;
        this.currentPage = currentPage;
        this.position = position;
        this.startTime = startTime;
    }

    getSessionDetails(): ReadingSession {
        return this;
    }
}

class ReadingSessionManager {
    private activeSessions: Map<string, ReadingSession> = new Map();
    private sessionHistory: Map<string, ReadingSession[]> = new Map();

    constructor() {
        this.activeSessions = new Map();
        this.sessionHistory = new Map();
    }

    getSession(bookId: string): ReadingSession | null {
        return this.activeSessions.get(bookId) || null;
    }

    startOrResumeSession(bookId: string): void {
        const existingSession = this.activeSessions.get(bookId);
        if (existingSession) {
            this.resumeSession(bookId, existingSession);
        } else {
            this.startSession(bookId);
        }
    }

    resumeSession(bookId: string, session: ReadingSession): void {
        const newSession = new ReadingSession(bookId, session.currentPage, session.position, new Date());
        this.activeSessions.set(bookId, newSession);
    }

    endSession(bookId: string, session: ReadingSession): void {
        this.activeSessions.set(bookId, session);
    }

}

class BookReaderTool {
    private book: Book;
    private user: User;

    constructor(book: Book, user: User) {
        this.book = book;
        this.user = user;
    }

    openBook(): void {
        const hasAccess = this.user.library.hasAccessToBook(this.book.id);
        if (!hasAccess) {
            throw new Error("User does not have access to this book");
        }

        // Start or resume reading session
        this.user.readingSessionManager.startOrResumeSession(this.book.id);

        const session = this.user.readingSessionManager.getSession(this.book.id);
        console.log(`Opened book at page ${session.currentPage}`);
    }

    goToPage(pageNumber: number): void {
        // logic to go to specific page
    }

    goToNextPage(): void {
        // logic to go to next page
    }

    getToPreviousPage(): void {
        // logic to go to previous page
    }

    addBookmark(pageNumber: number): void {
        // logic to add bookmark
    }

    addHighlight(pageNumber: number, color: string, note?: string): void {
        // logic to add highlight
    }

    closeBook(): void {
        // logic to close book and save session
    }
}

type HighlightDetails = {
    pageNumber: number;
    color: string;
    note?: string;
    date: Date;
}

type UserAccountDetails = {
    id: string;
    username: string;
    password: string;
    email: string;
    addrress?: string;
}
