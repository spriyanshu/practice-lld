// COMPOSITE PATTERN - Allows treating individual books and collections uniformly
interface ILibraryItem {
  getItems(): IBook[]; // unified interface for getting books from either single items or collections
}

// COMPOSITE PATTERN - Leaf node for single book items
class SingleBookItem implements ILibraryItem {
  constructor(private book: IBook) {}

  // Returns array containing single book for uniform interface
  getItems(): IBook[] {
    return [this.book];
  }
}

// COMPOSITE PATTERN - Composite node for book collections
class BookCollection implements ILibraryItem {
  private items: IBook[] = [];

  // Adds a book to the collection
  add(book: IBook) {
    this.items.push(book);
  }

  // Returns all books in the collection
  getItems(): IBook[] {
    return this.items;
  }
}

// Base interface for all book types
interface IBook {
  get title(): string;
  get author(): string;
  get ISBN(): string;
  get genre(): string;
}

// Concrete implementation for fiction books
class FictionBook implements IBook {
  private readonly _title: string;
  private readonly _author: string;
  private readonly _ISBN: string;
  private readonly _genre: string;

  constructor(title: string, author: string, ISBN: string) {
    this._title = title;
    this._author = author;
    this._ISBN = ISBN;
    this._genre = 'fiction';
  }

  // Returns the book title
  get title() {
    return this._title;
  }

  // Returns the book author
  get author() {
    return this._author;
  }

  // Returns the book ISBN
  get ISBN() {
    return this._ISBN;
  }

  // Returns the book genre (always 'fiction')
  get genre() {
    return this._genre;
  }
}

// Concrete implementation for non-fiction books
class NonFictionBook implements IBook {
  private readonly _title: string;
  private readonly _author: string;
  private readonly _ISBN: string;
  private readonly _genre: string;

  constructor(title: string, author: string, ISBN: string) {
    this._title = title;
    this._author = author;
    this._ISBN = ISBN;
    this._genre = 'nonfiction';
  }

  // Returns the book title
  get title() {
    return this._title;
  }

  // Returns the book author
  get author() {
    return this._author;
  }

  // Returns the book ISBN
  get ISBN() {
    return this._ISBN;
  }

  // Returns the book genre (always 'nonfiction')
  get genre() {
    return this._genre;
  }
}

// FACTORY PATTERN - Interface for creating books
interface IBookFactory {
  createBook(
    type: 'fiction' | 'nonfiction',
    title: string,
    author: string,
    ISBN: string
  ): IBook;
}

// FACTORY PATTERN - Concrete factory for creating different types of books
class BookFactory implements IBookFactory {
  // Creates appropriate book instance based on type parameter
  createBook(
    type: 'fiction' | 'nonfiction',
    title: string,
    author: string,
    ISBN: string
  ) {
    if (type === 'fiction') {
      return new FictionBook(title, author, ISBN);
    } else if (type === 'nonfiction') {
      return new NonFictionBook(title, author, ISBN);
    } else {
      throw new Error('Invalid book type');
    }
  }
}

// Interface for library members
interface IMember {
  getMemberName(): string;
  getMemberId(): string;
}

// Concrete implementation of library member
class Member implements IMember {
  private readonly _name: string;
  private readonly _memberId: string;

  constructor(name: string, memberId: string) {
    this._name = name;
    this._memberId = memberId;
  }

  // Returns the member's name
  getMemberName() {
    return this._name;
  }

  // Returns the member's unique ID
  getMemberId() {
    return this._memberId;
  }
}

// BUILDER PATTERN - Interface for building Member objects step by step
interface IMemberBuilder {
  buildMember(): Member;
  setName(name: string): IMemberBuilder;
  setMemberId(memberId: string): IMemberBuilder;
}

// BUILDER PATTERN - Concrete builder for creating Member objects with fluent interface
class MemberBuilder implements IMemberBuilder {
  private _name: string;
  private _memberId: string;

  constructor() {
    this._name = '';
    this._memberId = '';
  }

  // Builds and returns the final Member object
  buildMember() {
    if (!this._memberId) {
      throw new Error('MemberId is required');
    }
    return new Member(this._name, this._memberId);
  }

  // Sets the member name and returns builder for chaining
  setName(name: string) {
    this._name = name;
    return this;
  }

  // Sets the member ID and returns builder for chaining
  setMemberId(memberId: string) {
    this._memberId = memberId;
    return this;
  }
}

// Interface for managing book operations
interface IBookManager {
  getBookByISBN(ISBN: string): IBook | undefined;
  addBook(book: IBook): void;
}

// Concrete implementation for managing books in the library
class BookManager implements IBookManager {
  private _books: IBook[] = [];

  // Finds and returns a book by its ISBN
  getBookByISBN(ISBN: string) {
    return this._books.find((b) => b.ISBN === ISBN);
  }

  // Adds a new book to the library collection
  addBook(book: IBook) {
    if (this.getBookByISBN(book.ISBN)) {
      throw new Error('Book already exists');
    }
    this._books.push(book);
    console.log(`Added Book: ${book.title} by ${book.author}`);
  }
}

// Interface for managing member operations
interface IMemberManager {
  getMemberById(memberId: string): Member | undefined;
  registerMember(member: Member): void;
}

// Concrete implementation for managing library members
class MemberManager implements IMemberManager {
  private _members: Member[] = [];

  // Finds and returns a member by their ID
  getMemberById(memberId: string) {
    return this._members.find((m) => m.getMemberId() === memberId);
  }

  // Registers a new member in the library system
  registerMember(member: Member) {
    if (this.getMemberById(member.getMemberId())) {
      throw new Error('Member already registered');
    }
    this._members.push(member);
    console.log(`Registered Member: ${member.getMemberName()}`);
  }
}

// Interface for managing book borrowing operations
interface IBorrowManager {
  borrowBook(memberId: string, book: IBook): void;
  returnBook(memberId: string, bookISBN: string): void;
  isBookBorrowed(bookISBN: string): boolean;
  borrowItems(memberId: string, item: ILibraryItem): void;
}

// Concrete implementation for managing book borrowing
class BorrowManager implements IBorrowManager {
  private _borrowedBooks: Map<string, IBook[]> = new Map();

  // Records a book as borrowed by a specific member
  borrowBook(memberId: string, book: IBook) {
    const current = this._borrowedBooks.get(memberId) || [];
    current.push(book);
    this._borrowedBooks.set(memberId, current);
    console.log(`Borrowed Book: ${book.title} by ${book.author}`);
  }

  // Processes the return of a book by a member
  returnBook(memberId: string, bookISBN: string) {
    const books = this._borrowedBooks.get(memberId);
    if (books) {
      const filtered = books.filter((book) => book.ISBN !== bookISBN);
      if (filtered.length > 0) {
        this._borrowedBooks.set(memberId, filtered);
      } else {
        this._borrowedBooks.delete(memberId);
      }
    }
    console.log(`Returned Book: ${bookISBN}`);
  }

  // Checks if a specific book is currently borrowed
  isBookBorrowed(bookISBN: string) {
    for (const [, books] of this._borrowedBooks) {
      if (books.some((b) => b.ISBN === bookISBN)) {
        return true;
      }
    }
    return false;
  }

  // Borrows multiple items (books or collections) for a member
  borrowItems(memberId: string, item: ILibraryItem): void {
    const books = item.getItems();
    for (const book of books) {
      if (!this.isBookBorrowed(book.ISBN)) {
        this.borrowBook(memberId, book);
      } else {
        console.warn(`Book ${book.title} is already borrowed.`);
      }
    }
  }
}

// DECORATOR PATTERN - Adds logging functionality to existing BorrowManager
class LoggingBorrowManager implements IBorrowManager {
  constructor(private wrapped: IBorrowManager) {}

  // Logs borrowing action and delegates to wrapped manager
  borrowBook(memberId: string, book: IBook) {
    console.log(
      `Borrowing Book log  ${memberId} : ${book.title} by ${book.author}`
    );
    this.wrapped.borrowBook(memberId, book);
  }

  // Logs return action and delegates to wrapped manager
  returnBook(memberId: string, bookISBN: string): void {
    console.log(`[LOG] Returning: ${bookISBN} by member ${memberId}`);
    this.wrapped.returnBook(memberId, bookISBN);
  }

  // Delegates borrowed status check to wrapped manager
  isBookBorrowed(bookISBN: string): boolean {
    return this.wrapped.isBookBorrowed(bookISBN);
  }

  // Logs and delegates multiple item borrowing to wrapped manager
  borrowItems(memberId: string, item: ILibraryItem): void {
    const books = item.getItems();
    for (const book of books) {
      if (!this.isBookBorrowed(book.ISBN)) {
        this.borrowBook(memberId, book);
      } else {
        console.warn(`Book ${book.title} is already borrowed.`);
      }
    }
  }
}

// Main interface for library operations
interface ILibrary {
  addBook(book: IBook): void;
  registerMember(member: Member): void;
  borrowBook(memberId: string, bookISBN: string): void;
  returnBook(memberId: string, bookISBN: string): void;
  borrowItems(memberId: string, item: ILibraryItem): void;
}

// SINGLETON PATTERN - Ensures only one library instance exists
class Library implements ILibrary {
  private static _instance: Library;
  private readonly _bookManager: IBookManager;
  private readonly _memberManager: IMemberManager;
  private readonly _borrowManager: IBorrowManager;

  private constructor(
    bookManager: IBookManager,
    memberManager: IMemberManager,
    borrowManager: IBorrowManager
  ) {
    this._bookManager = bookManager;
    this._memberManager = memberManager;
    this._borrowManager = borrowManager;
  }

  // Returns singleton instance of Library
  static getInstance(
    bookManager: IBookManager,
    memberManager: IMemberManager,
    borrowManager: IBorrowManager
  ) {
    if (!Library._instance) {
      Library._instance = new Library(
        bookManager,
        memberManager,
        borrowManager
      );
    }
    return Library._instance;
  }

  // Adds a book to the library through book manager
  addBook(book: IBook) {
    this._bookManager.addBook(book);
  }

  // Registers a new member through member manager
  registerMember(member: Member) {
    this._memberManager.registerMember(member);
  }

  // Handles book borrowing with validation
  borrowBook(memberId: string, bookISBN: string) {
    const member = this._memberManager.getMemberById(memberId);
    if (!member) throw new Error('Member not found');

    const book = this._bookManager.getBookByISBN(bookISBN);
    if (!book) throw new Error('Book not found');

    // check if the book is already borrowed
    if (this._borrowManager.isBookBorrowed(bookISBN)) {
      throw new Error('Book already borrowed');
    }

    this._borrowManager.borrowBook(memberId, book);
  }

  // Handles book return with validation
  returnBook(memberId: string, bookISBN: string) {
    const member = this._memberManager.getMemberById(memberId);
    if (!member) throw new Error('Member not found');

    if (!this._borrowManager.isBookBorrowed(bookISBN)) {
      throw new Error('Book is not currently borrowed');
    }

    this._borrowManager.returnBook(memberId, bookISBN);
  }

  // Handles borrowing of multiple items (single books or collections)
  borrowItems(memberId: string, item: ILibraryItem): void {
    this._borrowManager.borrowItems(memberId, item);
  }
}

// Create singleton library instance with decorated borrow manager
const library = Library.getInstance(
  new BookManager(),
  new MemberManager(),
  new LoggingBorrowManager(new BorrowManager())
);

// ADAPTER PATTERN - Interface for adapting external book format
interface IBookAdapter {
  createBook(book: {
    name: string;
    writer: string;
    ISBN: string;
    type: 'fiction' | 'nonfiction';
  }): IBook;
}

// ADAPTER PATTERN - Adapts external book format to internal IBook interface
class BookAdapter implements IBookAdapter {
  // Converts external book format to internal book object
  createBook(book: {
    name: string;
    writer: string;
    ISBN: string;
    type: string;
  }) {
    return new BookFactory().createBook(
      book.type as 'fiction' | 'nonfiction',
      book.name,
      book.writer,
      book.ISBN
    );
  }
}

// Example usage with external book format
const book = {
  name: 'The Great Gatsby',
  writer: 'F. Scott Fitzgerald',
  ISBN: '97807432735657',
  type: 'fiction',
};

// Use adapter to convert and add book
const book2 = new BookAdapter().createBook(book);
library.addBook(book2);

// Use factory to create and add book directly
const bookFactory = new BookFactory();
library.addBook(
  bookFactory.createBook(
    'fiction',
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    '9780743273565'
  )
);

// Use builder to create member
const member = new MemberBuilder()
  .setName('John Doe')
  .setMemberId('123456')
  .buildMember();

// Register member and borrow book
library.registerMember(member);
library.borrowBook('123456', '9780743273565');

// Get same singleton instance
const library2 = Library.getInstance(
  new BookManager(),
  new MemberManager(),
  new LoggingBorrowManager(new BorrowManager())
);

// Return and borrow different books
library.returnBook('123456', '9780743273565');
library2.borrowBook('123456', '97807432735657');
library2.returnBook('123456', '97807432735657');

// Demonstrate Composite Pattern usage
const book1 = bookFactory.createBook('fiction', 'Book One', 'Author A', '111');
const book3 = bookFactory.createBook('fiction', 'Book Two', 'Author B', '222');

// Create collection of books
const collection = new BookCollection();
collection.add(book1);
collection.add(book3);

// Wrap single book for uniform interface
const wrappedSingle = new SingleBookItem(book3);

// Borrow multiple books as a collection
library2.borrowItems('123456', collection);

// Borrow single wrapped book
library2.borrowItems('123456', wrappedSingle);
