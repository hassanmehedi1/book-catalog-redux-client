import BookCard from "./BookCard";
import { CreateBookFormValues } from "./AddNewBook";
import { useSearchBooksQuery } from "../redux/features/books/bookApiSlice";
import { Spinner } from "@material-tailwind/react";

export default function BookList({ searchTerm }: any) {
  const {
    data: books,
    isLoading,
    isError,
  } = useSearchBooksQuery(searchTerm, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 500,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-500/10" />
      </div>
    );
  }

  if (isError) {
    return <p>Error occurred while fetching books.</p>;
  }

  return (
    <section className="bookList">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 py-5">
        Recently Added Books
      </h2>
      <div className="books grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books?.data &&
          books?.data
            ?.slice(0, 10)
            .map((book: CreateBookFormValues) => (
              <BookCard key={book._id} book={book} />
            ))}
      </div>
    </section>
  );
}
