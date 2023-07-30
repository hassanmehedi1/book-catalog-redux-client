import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import GetAllBookList from "./BookCard";
import { CreateBookFormValues } from "./AddNewBook";
import { useGetBooksQuery } from "../redux/features/books/bookApiSlice";

export default function AllBooks() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-500/10" />
      </div>
    );
  }

  // Search books by title or author
  const filteredBooks = books?.data?.filter((book: CreateBookFormValues) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || authorMatch;
  });

  // Extract unique genres from the book data
  const genres = [
    ...new Set(books?.data?.map((book: CreateBookFormValues) => book.genre)),
  ];

  // Extract unique years from the book data
  const years = [
    ...new Set(
      books?.data?.map((book: CreateBookFormValues) =>
        new Date(book.publicationDate).getFullYear().toString()
      )
    ),
  ];

  // Filter books by genre
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  // Filter books by publication year
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const filteredBooksByGenreAndYear = filteredBooks?.filter(
    (book: CreateBookFormValues) => {
      const genreMatch =
        !selectedGenre ||
        book.genre.toLowerCase() === selectedGenre.toLowerCase();
      const yearMatch =
        !selectedYear ||
        new Date(book.publicationDate).getFullYear().toString() ===
          selectedYear;
      return genreMatch && yearMatch;
    }
  );

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedGenre("");
    setSelectedYear("");
  };

  return (
    <section className="bookList">
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search by Title or Author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      <div className="flex justify-center space-x-4 my-6">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">All Genres</option>
          {(genres as string[]).map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">All Years</option>
          {(years as string[]).map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Reset Filters
        </button>
      </div>

      <div className="books grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooksByGenreAndYear?.map((book: CreateBookFormValues) => (
          <GetAllBookList key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}
