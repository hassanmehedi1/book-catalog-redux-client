import BookList from "../components/BookList";
import Footer from "../components/Footer";
import Search from "../components/SearchBook";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <section className="banner w-full">
        <Search setSearchTerm={setSearchTerm} />
        {/* bookList component */}
        <BookList searchTerm={searchTerm} />
      </section>
      <Footer />
    </>
  );
}
