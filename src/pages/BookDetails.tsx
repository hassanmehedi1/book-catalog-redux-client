/* eslint-disable no-empty-pattern */
import { Button } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@material-tailwind/react";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useGetReviewQuery,
  usePostReviewMutation,
} from "../redux/features/books/bookApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import EditDialog from "../components/EditBook";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Avatar } from "@material-tailwind/react";
import CurrentUserEmail from "../layouts/CurrentUserEmail";
import { getAccessToken } from "../redux/api/apiSlice";

type ReviewFormValues = {
  reviews: string;
};

export default function SingleBook() {
  const { id } = useParams();
  const token = getAccessToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: book, isLoading } = useGetBookByIdQuery(id!);

  // get review
  const { data: reviewData } = useGetReviewQuery(id);

  const [postReview, {}] = usePostReviewMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>();

  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    if (!token) {
      navigate("/login");
      toast.error("Please login to create a review", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    try {
      await postReview({ id, data: { reviews: data.reviews } }).unwrap();
      toast.success("Review added successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
      reset(); // Clear the form fields
    } catch (error) {
      console.log(error);
    }
  };

  const [deleteBook, {}] = useDeleteBookMutation();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id!)
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your book has been deleted.", "success");
            navigate("/books");
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete book.", "error");
            console.error("Failed to delete book:", error);
          });
      }
    });
  };

  // check login user email && bookData email
  const userEmail = CurrentUserEmail();
  const bookEmail = book?.data?.userEmail;
  const isCurrentUser = userEmail === bookEmail;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full rounded-lg p-5 shadow-lg">
      <section className="w-[40%] border-2 shadow-lg mb-10 grid grid-cols-1  gap-5 mx-auto p-6 rounded-lg">
        <div className="w-[60%] h-full flex justify-center mx-auto">
          <img
            className=" object-cover rounded-lg"
            src={book?.data?.image}
            alt=""
          />
        </div>
        <div className="text-center flex flex-col justify-center mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {book?.data?.title}
          </h3>
          <p className="text-gray-600 mb-3">
            Author: <span className="text-gray-800">{book?.data?.author}</span>
          </p>
          <p className="text-gray-600 mb-3">
            Genre: <span className="text-gray-800">{book?.data?.genre}</span>
          </p>
          <p className="text-gray-600">
            Publication Date:{" "}
            <span className="text-gray-800">{book?.data?.publicationDate}</span>
          </p>
          {isCurrentUser && (
            <div className=" flex gap-3 mt-6 mx-auto">
              <EditDialog book={book} />
              <Button className="w-28" color="red" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </section>
      <div className="comment px-5 py-8 bg-white rounded-lg shadow-lg mb-5 w-1/2 mx-auto">
        <h4 className="text-gray-600 text-lg font-medium mb-3">Book Review</h4>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              label="Write a review..."
              {...register("reviews", { required: "Review is required" })}
              className="mb-3"
            />
            {errors.reviews && (
              <span className="text-red-500">{errors.reviews.message}</span>
            )}
            <Button
              className="mt-4 w-1/2 mx-auto"
              fullWidth
              type="submit"
              color="teal"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className="userReview px-5 py-8 bg-white rounded-lg shadow-lg">
        <div className="user">
          {reviewData?.data?.reviews && reviewData?.data?.reviews.length > 0 ? (
            reviewData?.data?.reviews.map((review: string, index: number) => (
              <div key={index} className="flex items-center my-3">
                <Avatar
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                  alt="avatar"
                />
                <p className="ml-4 text-gray-800"> {review} </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
