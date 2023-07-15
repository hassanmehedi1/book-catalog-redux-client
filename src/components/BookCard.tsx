import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { IBooks } from "../types/globalTypes";

interface IProps {
  book: IBooks;
}

export default function BookCard({book}: IProps) {
  return (
    <Card className="max-w-[26rem] overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500">
      <CardBody>
        <Typography variant="h5" className="text-blue-gray-900">
          Title: {book.title}
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 font-normal text-blue-gray-800"
        >
          Author: {book.author}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between mt-3">
        <div className="flex items-center -space-x-3">
          <Tooltip content="Genre">
            <Typography variant="p" color="white" className="font-normal">
              Genre: {book.genre}
            </Typography>
          </Tooltip>
        </div>
        <Typography color="white" className="font-normal">
          Published: {book.p_date}
        </Typography>
      </CardFooter>
    </Card>
  );
}
