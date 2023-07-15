/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IBooks } from "../types/globalTypes";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import BookReview from "../components/BookReview";

export default function BookDetails() {
  const { id } = useParams();

  const [data, setData] = useState<IBooks[]>([]);
  const [book, setBook] = useState<IBooks | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetch("../../public/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    const selectedBook = data.find((item) => item._id === Number(id));
    setBook(selectedBook!);
  }, [data, id]);

  const handleEditBook = () => {
    // history.push(`/edit-book/${id}`);
  };

  const handleDeleteBook = () => {
    // Implement your logic to delete the book
    // You can show a confirmation dialogue here before deleting the book
    // For demonstration purposes, we'll just log a message
    console.log("Book deleted");
  };

  return (
    <section className="grid grid-cols-1 justify-center">
      <div className="flex justify-center">
        <Card className="w-[40%] py-10 bg-gradient-to-r from-cyan-500 to-blue-500">
          <CardBody>
            <Typography variant="h5" className="text-blue-gray-900 text-center">
              Title: {book?.title}
            </Typography>
            <Typography
              variant="lead"
              className="mt-3 font-normal text-blue-gray-800 text-center"
            >
              Author: {book?.author}
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-between mt-3">
            <div className="flex items-center -space-x-3">
              <Tooltip content="Genre">
                <Typography variant="p" color="white" className="font-normal">
                  Genre: {book?.genre}
                </Typography>
              </Tooltip>
            </div>
            <Typography color="white" className="font-normal">
              Published: {book?.p_date}
            </Typography>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <Button color="teal" size="lg" onClick={handleEditBook}>
          Edit Book
        </Button>
        <Button color="red" size="lg" onClick={() => setDeleteModalOpen(true)}>
          Delete Book
        </Button>
      </div>

      <div>
        <BookReview />
      </div>

      {/* Delete Book Confirmation Modal */}
    </section>
  );
}
