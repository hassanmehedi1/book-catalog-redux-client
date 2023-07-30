// import { useState } from "react";
// import { usePostBookMutation } from "../redux/api/apiSlice";

// export default function AddNewBook() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [genre, setGenre] = useState("");
//   const [publicationDate, setPublicationDate] = useState("");

//   const [postBook, { isLoading }] = usePostBookMutation();

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAuthor(e.target.value);
//   };

//   const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setGenre(e.target.value);
//   };

//   const handlePublicationDateChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPublicationDate(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Create a new book object
//     const newBook = {
//       data: {
//         title: title,
//         author: author,
//         genre: genre,
//         p_date: publicationDate,
//       },
//     };

//     postBook(newBook);

//     // Implement your logic to save the new book to the database or update the state with the new book
//     // For this example, we'll just log the new book to the console
//     console.log(newBook);
//   };

//   return (
//     <section>
//       <h1 className="text-center text-3xl font-bold text-teal-600">
//         Add New Book
//       </h1>

//       <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
//         <div className="mb-4">
//           <label htmlFor="title" className="block font-medium text-gray-700">
//             Title:
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={handleTitleChange}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="author" className="block font-medium text-gray-700">
//             Author:
//           </label>
//           <input
//             type="text"
//             id="author"
//             value={author}
//             onChange={handleAuthorChange}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="genre" className="block font-medium text-gray-700">
//             Genre:
//           </label>
//           <input
//             type="text"
//             id="genre"
//             value={genre}
//             onChange={handleGenreChange}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="publicationDate"
//             className="block font-medium text-gray-700"
//           >
//             Publication Date:
//           </label>
//           <input
//             type="text"
//             id="publicationDate"
//             value={publicationDate}
//             onChange={handlePublicationDateChange}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         </div>

//         <div className="flex justify-center mt-6">
//           <button
//             type="submit"
//             className="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
//           >
//             Add Book
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }
