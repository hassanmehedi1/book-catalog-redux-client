import { IBooks } from "../types/globalTypes";

interface FilterByPublicationYearProps {
  filterByYear: (year: string) => void;
  books: { data: IBooks[] } | undefined;
}

export default function FilterByPublicationYear({
  filterByYear,
  books,
}: FilterByPublicationYearProps) {
  const years = [
    ...new Set(
      books?.data?.map((book) => new Date(book.publicationDate).getFullYear())
    ),
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterByYear(event.target.value);
  };

  return (
    <div className="w-full md:w-72">
      <label
        htmlFor="publicationYear"
        className="block text-sm font-medium text-gray-700"
      >
        Filter By Publication Year
      </label>
      <select
        id="publicationYear"
        name="publicationYear"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={handleChange}
      >
        <option value="">All</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
