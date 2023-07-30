import { IBooks } from "../types/globalTypes";

interface FilterByGenreProps {
  filterByGenre: (genre: string) => void;
  books: { data: IBooks[] } | undefined;
}

export default function FilterByGenre({
  filterByGenre,
  books,
}: FilterByGenreProps) {
  const genres = [...new Set(books?.data?.map((book) => book.genre))];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterByGenre(event.target.value);
  };

  return (
    <div className="w-full md:w-72">
      <label
        htmlFor="genre"
        className="block text-sm font-medium text-gray-700"
      >
        Filter By Genre
      </label>
      <select
        id="genre"
        name="genre"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={handleChange}
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
