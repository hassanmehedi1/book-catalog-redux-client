/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { IBooks } from "../types/globalTypes";
import BookCard from "../components/BookCard";

export default function AllBooks() {
   const [data, setData] = useState<IBooks[]>([]);

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const booksData = data;

  
  return (
    <section>
      <div className="grid grid-cols-3 gap-5 pb-20 container mx-auto mt-10">
        {booksData?.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}
