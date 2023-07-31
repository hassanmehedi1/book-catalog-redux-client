import { Spinner } from "@material-tailwind/react";
import CurrentUserEmail from "../../layouts/CurrentUserEmail";
import { useGetAllWishListQuery } from "../../redux/features/books/bookApiSlice";
import ReadingListCard from "./ReadingListCard";

export default function ReadingList() {
  const { data: wishList, isLoading } = useGetAllWishListQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  // console.log(wishList?.data)
  const currentUserEmail = CurrentUserEmail();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-500/10" />
      </div>
    );
  }

  // Filter wishList data based on matching userEmail
  const filteredWishList = wishList?.data?.filter(
    (item: any) =>
      item.userEmail === currentUserEmail && item.status === "reading"
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredWishList &&
          filteredWishList?.map((item: any) => (
            <ReadingListCard item={item} key={item?._id} />
          ))}
      </div>
    </div>
  );
}
