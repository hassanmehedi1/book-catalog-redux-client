// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { IBooks } from "../types/globalTypes";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Avatar,
//   Tooltip,
//   Button,
// } from "@material-tailwind/react";
// import BookReview from "../components/BookReview";
// import { useGetBooksQuery, useSingleBookQuery } from "../redux/api/apiSlice";

// export default function BookDetails() {
//   const { id } = useParams();

//   const { data: book, isLoading, isError } = useSingleBookQuery(id);

//   return (
//     <section className="grid grid-cols-1 justify-center">
//       <div className="flex justify-center">
//         <Card className="w-[40%] py-10 bg-gradient-to-r from-cyan-500 to-blue-500">
//           <CardBody>
//             <Typography variant="h5" className="text-blue-gray-900 text-center">
//               Title: {book?.title}
//             </Typography>
//             <Typography
//               variant="lead"
//               className="mt-3 font-normal text-blue-gray-800 text-center"
//             >
//               Author: {book?.author}
//             </Typography>
//           </CardBody>
//           <CardFooter className="flex items-center justify-between mt-3">
//             <div className="flex items-center -space-x-3">
//               <Tooltip content="Genre">
//                 <Typography variant="p" color="white" className="font-normal">
//                   Genre: {book?.genre}
//                 </Typography>
//               </Tooltip>
//             </div>
//             <Typography color="white" className="font-normal">
//               Published: {book?.p_date}
//             </Typography>
//           </CardFooter>
//         </Card>
//       </div>

//       <div className="flex justify-center mt-6 space-x-4">
//         <Button color="teal" size="lg">
//           Edit Book
//         </Button>
//         <Button color="red" size="lg">
//           Delete Book
//         </Button>
//       </div>

//       <div>
//         <BookReview id={id!} />
//       </div>
//     </section>
//   );
// }
