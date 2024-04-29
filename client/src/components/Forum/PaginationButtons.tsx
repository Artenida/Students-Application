import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const PaginationButtons: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      breakLabel={<span className="mr-4">...</span>}
      nextLabel={<FaAngleRight className="text-custom-color3" />}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<FaAngleLeft className="text-custom-color3" />}
      renderOnZeroPageCount={null}
      marginPagesDisplayed={2}
      containerClassName="flex items-center justify-center mt-12"
      pageLinkClassName="inline-flex items-center justify-center border border-solid border-custom-color2 hover:bg-custom-color2 w-10 h-10 rounded-md mr-4 cursor-pointer"
      activeLinkClassName="bg-custom-color3 text-custom-color1"
      previousClassName="mx-1 px-3 py-3 mr-4 flex items-center justify-center bg-custom-color2 rounded-md"
      nextClassName="mx-1 px-3 py-3 flex items-center justify-center bg-custom-color2 rounded-md"
      previousLinkClassName="inline-block"
      nextLinkClassName="inline-block"
    />
  );
};

export default PaginationButtons;
