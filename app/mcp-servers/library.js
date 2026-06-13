const books = [
  { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", subject: "Computer Science", available: true, copies: 3, location: "Section A, Shelf 12", isbn: "978-0262033848" },
  { id: 2, title: "Data Structures and Algorithms in Java", author: "Robert Lafore", subject: "Computer Science", available: true, copies: 2, location: "Section A, Shelf 13", isbn: "978-0672324536" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", subject: "Software Engineering", available: false, copies: 0, location: "Section A, Shelf 15", isbn: "978-0132350884", dueBack: "2026-06-12" },
  { id: 4, title: "Design Patterns", author: "Gang of Four", subject: "Software Engineering", available: true, copies: 1, location: "Section A, Shelf 15", isbn: "978-0201633610" },
  { id: 5, title: "Operating System Concepts", author: "Abraham Silberschatz", subject: "Computer Science", available: true, copies: 4, location: "Section B, Shelf 3", isbn: "978-1119800361" },
  { id: 6, title: "Computer Networking: A Top-Down Approach", author: "James Kurose", subject: "Computer Science", available: false, copies: 0, location: "Section B, Shelf 5", isbn: "978-0136681557", dueBack: "2026-06-15" },
  { id: 7, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", subject: "AI/ML", available: true, copies: 2, location: "Section C, Shelf 1", isbn: "978-0134610993" },
  { id: 8, title: "Deep Learning", author: "Ian Goodfellow", subject: "AI/ML", available: true, copies: 1, location: "Section C, Shelf 2", isbn: "978-0262035613" },
  { id: 9, title: "Linear Algebra and Its Applications", author: "David C. Lay", subject: "Mathematics", available: true, copies: 5, location: "Section D, Shelf 1", isbn: "978-0321982384" },
  { id: 10, title: "Calculus: Early Transcendentals", author: "James Stewart", subject: "Mathematics", available: true, copies: 3, location: "Section D, Shelf 2", isbn: "978-1285741550" },
  { id: 11, title: "Engineering Mechanics: Statics", author: "R.C. Hibbeler", subject: "Mechanical Engineering", available: false, copies: 0, location: "Section E, Shelf 1", isbn: "978-0134918921", dueBack: "2026-06-10" },
  { id: 12, title: "Fundamentals of Electric Circuits", author: "Charles Alexander", subject: "Electrical Engineering", available: true, copies: 2, location: "Section E, Shelf 4", isbn: "978-0078028229" },
  { id: 13, title: "Digital Design", author: "M. Morris Mano", subject: "Electronics", available: true, copies: 3, location: "Section E, Shelf 6", isbn: "978-0134549897" },
  { id: 14, title: "Database System Concepts", author: "Abraham Silberschatz", subject: "Computer Science", available: true, copies: 2, location: "Section A, Shelf 18", isbn: "978-0078022159" },
  { id: 15, title: "The Pragmatic Programmer", author: "David Thomas", subject: "Software Engineering", available: true, copies: 1, location: "Section A, Shelf 16", isbn: "978-0135957059" },
  { id: 16, title: "Discrete Mathematics and Its Applications", author: "Kenneth Rosen", subject: "Mathematics", available: false, copies: 0, location: "Section D, Shelf 3", isbn: "978-0073383095", dueBack: "2026-06-20" },
  { id: 17, title: "Physics for Scientists and Engineers", author: "Raymond Serway", subject: "Physics", available: true, copies: 4, location: "Section F, Shelf 1", isbn: "978-1337553278" },
  { id: 18, title: "Organic Chemistry", author: "Paula Bruice", subject: "Chemistry", available: true, copies: 2, location: "Section F, Shelf 5", isbn: "978-0134042282" },
  { id: 19, title: "Machine Learning", author: "Tom Mitchell", subject: "AI/ML", available: true, copies: 1, location: "Section C, Shelf 3", isbn: "978-0070428072" },
  { id: 20, title: "Computer Organization and Design", author: "David Patterson", subject: "Computer Science", available: true, copies: 3, location: "Section B, Shelf 1", isbn: "978-0128201091" },
];

const libraryHours = {
  monday: { open: "8:00 AM", close: "10:00 PM" },
  tuesday: { open: "8:00 AM", close: "10:00 PM" },
  wednesday: { open: "8:00 AM", close: "10:00 PM" },
  thursday: { open: "8:00 AM", close: "10:00 PM" },
  friday: { open: "8:00 AM", close: "8:00 PM" },
  saturday: { open: "9:00 AM", close: "6:00 PM" },
  sunday: { open: "10:00 AM", close: "5:00 PM" },
};

export const toolDefinitions = [
  {
    name: "searchBooks",
    description: "Search for books in the campus library by title, author, or subject. Returns matching books with availability status.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query - can be a book title, author name, or subject" }
      },
      required: ["query"]
    }
  },
  {
    name: "checkAvailability",
    description: "Check the availability of a specific book by its ID. Returns availability status, copies, and location.",
    parameters: {
      type: "object",
      properties: {
        bookId: { type: "number", description: "The ID of the book to check" }
      },
      required: ["bookId"]
    }
  },
  {
    name: "getPopularBooks",
    description: "Get a list of popular/trending books in the campus library.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "getLibraryHours",
    description: "Get the campus library operating hours for each day of the week.",
    parameters: { type: "object", properties: {}, required: [] }
  }
];

export function handleTool(name, args) {
  switch (name) {
    case "searchBooks": {
      const q = (args.query || "").toLowerCase();
      const results = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q)
      );
      return { results, total: results.length };
    }
    case "checkAvailability": {
      const book = books.find(b => b.id === args.bookId);
      if (!book) return { error: "Book not found" };
      return {
        title: book.title,
        available: book.available,
        copies: book.copies,
        location: book.location,
        dueBack: book.dueBack || null
      };
    }
    case "getPopularBooks":
      return { books: books.filter(b => b.available).slice(0, 8) };
    case "getLibraryHours":
      return { hours: libraryHours };
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export function getWidgetData() {
  const available = books.filter(b => b.available);
  const checkedOut = books.filter(b => !b.available);
  return {
    totalBooks: books.length,
    availableCount: available.length,
    checkedOutCount: checkedOut.length,
    recentlyAdded: books.slice(-3),
    popularBooks: available.slice(0, 5),
    hours: libraryHours,
    checkedOutBooks: checkedOut.map(b => ({ title: b.title, dueBack: b.dueBack }))
  };
}
