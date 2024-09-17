import { Dispatch, SetStateAction } from "react";
import { Child } from "../_interfaces/child";
import ChildrensCard from "./childrensCard";

interface ChildrenListProps {
  childrenData: Child[];
  reloadData: () => void;
}

export default function ChildrenList({
  childrenData,
  reloadData,
}: ChildrenListProps) {
  return (
    <div className="flex flex-col gap-4">
      {childrenData.map((child: Child) => (
        <ChildrensCard
          key={child.childId}
          child={child}
          reloadData={reloadData}
        />
      ))}
    </div>
  );
}
