import { Dispatch, SetStateAction } from "react";
import { checkInChild, checkOutChild } from "../_api/api";
import { formatDate } from "../_utils/birthdayFormatter";
import { Child } from "../_interfaces/child";
import Button from "./button";

interface ChildProps {
  child: Child;
  reloadData: () => void;
}

export default function ChildrensCard({ child, reloadData }: ChildProps) {
  function updateChildren(type: string) {
    if (type == "checkIn") {
      checkInChild(child.childId);
    } else if (type == "checkOut") {
      checkOutChild(child.childId);
    }
    reloadData();
  }
  return (
    <div
      className={`flex flex-row justify-between border ${
        child.checkedIn ? "border-green-300" : "border-red-600"
      }  rounded-md p-2 px-4`}
    >
      <section>
        <h2>{child.name.fullName}</h2>
        <p>Birthday: {formatDate(child.birthday)}</p>
        <p>Gender: {child.gender === 1 ? "Male" : "Female"}</p>
      </section>
      <section className="flex flex-col justify-center">
        {child.checkedIn ? (
          <Button
            label="Check Out"
            onClick={() => updateChildren("checkOut")}
            className="min-w-[140px]"
          />
        ) : (
          <Button
            label="Check In"
            onClick={() => updateChildren("checkIn")}
            className="min-w-[140px]"
          />
        )}
      </section>
    </div>
  );
}
