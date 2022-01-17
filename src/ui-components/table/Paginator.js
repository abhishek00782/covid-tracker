import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Box, Flex } from "reflexbox";
import { Button } from "../button";

export function Paginator({ instance, className }) {
  const {
    totalCount,
    pageIndex,
    pageSize,
    sizeOptions,
    onPageSizeChange,
    onPageIndexChange,
  } = instance;
  const [activePageIndex, changePageIndex] = useState(pageIndex + 1);
  const pageCount =
    totalCount % pageSize === 0
      ? Math.floor(totalCount / pageSize)
      : Math.floor(totalCount / pageSize) + 1;

  useEffect(() => {
    changePageIndex(pageIndex + 1);
  }, [pageIndex]);

  const nextPage = () => {
    if (onPageIndexChange) onPageIndexChange(pageIndex + 1);
  };

  const previousPage = () => {
    if (onPageIndexChange) onPageIndexChange(pageIndex - 1);
  };

  const goToPage = (n) => {
    if (n > 0 && n <= pageCount) {
      if (onPageIndexChange) onPageIndexChange(n);
    }
  };

  const getRowRange = () => {
    const firstRowIndex = pageSize * pageIndex + 1;
    const lastRowIndex =
      totalCount < pageSize * (pageIndex + 1)
        ? totalCount
        : pageSize * (pageIndex + 1);
    return `${firstRowIndex}-${lastRowIndex}`;
  };

  const getSafePage = (page) => {
    if (page > 0 && page <= pageCount) {
      return page;
    }
    return 1;
  };

  const changePage = (page) => {
    const p = getSafePage(page);
    changePageIndex(p);

    if (pageIndex !== p - 1) {
      goToPage(p - 1);
    }
  };

  const applyPage = () => {
    changePage(activePageIndex);
  };

  const sizeOptionsAllowed = [];

  for (let i = 0; i < sizeOptions.length; i += 1) {
    sizeOptionsAllowed.push(
      <option key={sizeOptions[i]} value={sizeOptions[i]}>
        {sizeOptions[i]}
      </option>
    );
    if (totalCount < sizeOptions[i]) break;
  }

  return (
    <small className={`${className} pagination`}>
      {sizeOptionsAllowed.length > 1 && (
        <>
          <select
            value={pageSize}
            onChange={(e) => {
              if (onPageSizeChange) onPageSizeChange(Number(e.target.value));
            }}
          >
            {sizeOptionsAllowed}
          </select>
          <Box ml="5px" mr={15}>
            items per page
          </Box>
          <span className="circle" />
        </>
      )}
      <Box px={15}>{`${getRowRange()} of ${totalCount} items`}</Box>
      <span className="circle" />
      <Flex px={15} alignItems="center">
        Page
        <Button clear disabled={!(pageIndex > 0)} onClick={previousPage}>
          <MdChevronLeft />
        </Button>
        <span>
          <input
            width={48}
            height={24}
            type="number"
            value={activePageIndex}
            onChange={(e) => {
              const page = e.target.value;
              changePageIndex(Number(page));
            }}
            onBlur={applyPage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyPage();
              }
            }}
            disabled={pageCount === 1}
          />
        </span>
        <Button clear disabled={pageIndex + 1 >= pageCount} onClick={nextPage}>
          <MdChevronRight />
        </Button>
        of {pageCount}
      </Flex>
    </small>
  );
}
