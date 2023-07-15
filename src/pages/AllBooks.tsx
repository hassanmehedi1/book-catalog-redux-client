/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { IBooks } from "../types/globalTypes";
import BookCard from "../components/BookCard";

export default function AllBooks() {
  const [data, setData] = useState<IBooks[]>([]);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const booksData = data;

  return (
    <section>
      <h1 className="text-center text-3xl font-bold text-teal-600">
        All Books
      </h1>
      <div className="grid grid-cols-3 gap-5 pb-20 container mx-auto mt-10 cursor-pointer">
        {booksData?.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}
