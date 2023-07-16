import { Avatar, Button, Textarea } from "@material-tailwind/react";

const dummyComments = [
  "Bhalo na",
  "Ki shob ghori egula??",
  "Eta kono product holo ??",
  "200 taka dibo, hobe ??",
];

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl text-center mb-5 font-semibold">Leave a Review</h1>

      <div className="flex gap-5 items-center">
        <Textarea
          placeholder="Write Your Review Here"
          className="min-h-[30px]"
        />
        <Button className="rounded-full h-10 w-10 p-2 text-[25px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </Button>
      </div>
      <div className="mt-10">
        {dummyComments.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar
              src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
              alt="avatar"
            />
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
