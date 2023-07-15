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
} from "@material-tailwind/react";

export default function BookDetails() {
  const { id } = useParams();

  const [data, setData] = useState<IBooks[]>([]);

  useEffect(() => {
    fetch("../../public/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const book = data?.find((item) => item._id === Number(id));
  return (
    <section className="flex justify-center">
      <Card className="w-[35%] py-10 bg-gradient-to-r from-cyan-500 to-blue-500">
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
    </section>
  );
}
