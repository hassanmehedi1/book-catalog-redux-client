import BookList from "../components/BookList";
import Footer from "../components/Footer";
import Search from "../components/SearchBook";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <section className="banner w-full">
        <h1 className="text-6xl text-center font-bold text-blue-700 mb-10">
          Welcome To Book Verse
        </h1>
        <Search setSearchTerm={setSearchTerm} />
        {/* bookList component */}
        <BookList searchTerm={searchTerm} />
      </section>
      <Footer />
    </>
  );
}
