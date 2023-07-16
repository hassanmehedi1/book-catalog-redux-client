/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { IBooks } from "../types/globalTypes";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../redux/api/apiSlice";

export default function AllBooks() {
  // const [data, setData] = useState<IBooks[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // useEffect(() => {
  //   fetch("./data.json")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const filteredBooks = data?.data?.filter(
    (book: {
      title: string;
      author: string;
      genre: string;
      p_date: string | string[];
    }) => {
      const titleMatch = book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const authorMatch = book.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const genreMatch =
        book.genre.toLowerCase() === selectedGenre.toLowerCase();
      const yearMatch = book.p_date.includes(selectedYear);

      return (
        (titleMatch || authorMatch) &&
        (!selectedGenre || genreMatch) &&
        (!selectedYear || yearMatch)
      );
    }
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setSelectedYear("");
  };

  // Extract unique genres from the book data
  const genres = [
    ...new Set(data?.data?.map((book: { genre: string }) => book.genre)),
  ];

  // Extract unique years from the book data
  const years = [
    ...new Set(data?.data?.map((book: { p_date: string }) => book.p_date)),
  ];

  return (
    <section>
      <h1 className="text-center text-3xl font-bold text-teal-600">
        All Books
      </h1>

      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search by Title or Author"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      <div className="flex justify-center space-x-4 my-6">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          {/* <option value="Drama">Drama</option>  */}
          {(genres as string[]).map((genre: string, i: number) => (
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
          {(years as string[]).map((year: string, i: number) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Reset Filters
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <Link
          to="/add-new-book"
          className="px-4 py-2 text-white bg-orange-800 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Add New Book
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5 pb-20 container mx-auto mt-10 cursor-pointer">
        {filteredBooks &&
          filteredBooks.map((book: IBooks) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>
    </section>
  );
}
