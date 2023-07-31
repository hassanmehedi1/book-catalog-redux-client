/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

import { AiFillBook } from "react-icons/ai";
import { FaBookOpenReader } from "react-icons/fa6";
import {
  BsFillBookmarkHeartFill,
  BsFillClipboardCheckFill,
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToWishListMutation } from "../../redux/features/books/bookApiSlice";
import { ItemCardProps } from "../AddNewBook";

// Define the type for localStorageColors
type LocalStorageColors = {
  [key: string]: string;
};

export default function CompletedCard({ item }: ItemCardProps) {
  const [localStorageColors, setLocalStorageColors] =
    useState<LocalStorageColors>({});
  //   console.log(item?.bookId?.author)

  const { title, author, genre, image, publicationDate, _id } = item?.bookId;

  const [addToWishList] = useAddToWishListMutation();

  const handleAddToWishList = async (status: string) => {
    try {
      await addToWishList({ bookId: _id, status: status });

      const toastMessage =
        localStorageColors[_id] === status
          ? `Removed from ${status} List`
          : `Added to ${status} List`;

      toast.success(toastMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });

      // Toggle the color
      const updatedColors = { ...localStorageColors };
      updatedColors[_id] = localStorageColors[_id] === status ? "" : status;
      localStorage.setItem(
        "tooltipButtonColors",
        JSON.stringify(updatedColors)
      );
      setLocalStorageColors(updatedColors);
    } catch (error) {
      console.error("Failed to add to Wish List:", error);
      toast.error("Failed to add to Wish List", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    // Retrieve the colors from localStorage on component mount
    const storedColors = localStorage.getItem("tooltipButtonColors");
    if (storedColors) {
      setLocalStorageColors(JSON.parse(storedColors));
    }
  }, []);

  const getIconColor = (status: string) => {
    return localStorageColors[_id] === status
      ? "text-blue-600"
      : "text-gray-600";
  };

  return (
    <>
      <Card className="shadow-lg relative rounded-lg">
        <Link className="pb-12 block" to={`/books/${item?.bookId?._id}`}>
          <CardHeader floated={false} color="blue-gray">
            <img
              className="w-1/2 h-1/2 mx-auto object-cover"
              src={image}
              alt="Book Cover"
            />
          </CardHeader>
          <CardBody className="p-4 w-1/2 mx-auto text-center">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-bold text-lg mb-2"
            >
              {title.slice(0, 25)}
            </Typography>
            <Typography color="gray" className="font-semibold mb-1">
              Author: {author}
            </Typography>
            <Typography color="gray" className="font-normal mb-1">
              Genre: {genre}
            </Typography>
            <Typography color="gray" className="font-normal">
              Publication: {publicationDate}
            </Typography>
          </CardBody>
        </Link>
        <div className="absolute m-auto left-0 right-0 bottom-2 bg-white flex gap-4 w-1/2 mx-auto rounded-full justify-center items-center">
          <Tooltip content="Add to Wish List">
            <span
              onClick={() => handleAddToWishList("wishList")}
              className={`cursor-pointer p-3 text-gray-600 transition-colors hover:text-blue-500 hover:bg-blue-50 rounded-full`}
            >
              <AiFillBook className={`h-5 w-5 ${getIconColor("wishList")}`} />
            </span>
          </Tooltip>
          <Tooltip content="Reading">
            <span
              onClick={() => handleAddToWishList("reading")}
              className={`cursor-pointer p-3 text-gray-600 transition-colors hover:text-blue-500 hover:bg-blue-50 rounded-full`}
            >
              <FaBookOpenReader
                className={`h-5 w-5 ${getIconColor("reading")}`}
              />
            </span>
          </Tooltip>
          <Tooltip content="Plan to read">
            <span
              onClick={() => handleAddToWishList("plan")}
              className={`cursor-pointer p-3 text-gray-600 transition-colors hover:text-blue-500 hover:bg-blue-50 rounded-full`}
            >
              <BsFillBookmarkHeartFill
                className={`h-5 w-5 ${getIconColor("plan")}`}
              />
            </span>
          </Tooltip>
          <Tooltip content="Complete">
            <span
              onClick={() => handleAddToWishList("complete")}
              className={`cursor-pointer p-3 text-gray-600 transition-colors hover:text-blue-500 hover:bg-blue-50 rounded-full`}
            >
              <BsFillClipboardCheckFill
                className={`h-5 w-5 ${getIconColor("complete")}`}
              />
            </span>
          </Tooltip>
        </div>
      </Card>
    </>
  );
}
