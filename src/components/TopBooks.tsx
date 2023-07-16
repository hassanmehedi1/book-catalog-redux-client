/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { IBooks } from "../types/globalTypes";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/api/apiSlice";

export default function TopBooks() {
  // const [data, setData] = useState<IBooks[]>([]);

  // useEffect(() => {
  //   fetch("./data.json")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  const booksData = data?.data;

  return (
    <section className="cursor-pointer">
      <h1 className="text-center text-3xl font-bold text-deep-orange-600 mt-10">
        Top Books
      </h1>
      <div className="grid grid-cols-3 gap-5 pb-20 container mx-auto mt-10">
        {booksData?.slice(0, 10).map((book: IBooks) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}
