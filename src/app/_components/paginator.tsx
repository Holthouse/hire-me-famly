import Button from "./button";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorProps) => {
  return (
    <div className="flex justify-center mt-auto gap-4">
      <Button
        label="<"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 aspect-square"
      />
      <span className="mx-2 my-auto">{`${currentPage} / ${totalPages}`}</span>
      <Button
        label=">"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 aspect-square"
      />
    </div>
  );
};

export default Paginator;
