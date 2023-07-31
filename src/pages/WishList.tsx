import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { AiFillBook } from "react-icons/ai";
import { FaBookOpenReader } from "react-icons/fa6";
import {
  BsFillBookmarkHeartFill,
  BsFillClipboardCheckFill,
} from "react-icons/bs";

import AllWishList from "../components/wishlist/AllWishList";
import Completed from "../components/wishlist/CompletedList";
import ReadingList from "../components/wishlist/ReadingList";
import PlanToReadList from "../components/wishlist/PlanToReadList";

export default function WishList() {
  const data = [
    {
      label: "Wish List",
      value: "Wish List",
      icon: AiFillBook,
      desc: <AllWishList />,
    },
    {
      label: "Reading",
      value: "Reading",
      icon: FaBookOpenReader,
      desc: <ReadingList />,
    },
    {
      label: "Plan To Read",
      value: "Plan To Read",
      icon: BsFillBookmarkHeartFill,
      desc: <PlanToReadList />,
    },
    {
      label: "Completed",
      value: "Completed",
      icon: BsFillClipboardCheckFill,
      desc: <Completed />,
    },
  ];
  return (
    <Tabs value="Wish List" className="w-[90%] mx-auto">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            <div className="">{desc}</div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
