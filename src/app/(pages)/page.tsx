"use client";

import { useState, useEffect } from "react";
import ChildrenList from "../_components/childrenList";
import Paginator from "../_components/paginator";
import { fetchChildren } from "../_api/api";
import { Child } from "../_interfaces/child";

const DELAY = 500; // Delay for reloading fetch
const ITEMS_PER_PAGE = 5; // Number of items for pagination

export default function Home() {
  const [childrenData, setChildrenData] = useState<Child[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pagination, setPagination] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setIsFetching(true);
    try {
      const children = await fetchChildren();

      // Sort children by checkedIn status where true is first and false is last)
      const sortedChildren = children.sort((a: Child, b: Child) => {
        return a.checkedIn === b.checkedIn ? 0 : a.checkedIn ? -1 : 1;
      });

      setChildrenData(sortedChildren);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (reload) {
      const timer = setTimeout(() => {
        fetchData();
        setReload(false);
      }, DELAY);
      return () => clearTimeout(timer);
    }
  }, [reload]);

  const handleReload = () => {
    if (!isFetching) {
      setReload(true);
    }
  };

  const paginatedData =
    childrenData?.slice(
      (pagination - 1) * ITEMS_PER_PAGE,
      pagination * ITEMS_PER_PAGE
    ) || [];

  const totalPages = childrenData
    ? Math.ceil(childrenData.length / ITEMS_PER_PAGE)
    : 1;

  const handlePageChange = (page: number) => {
    setPagination(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-screen h-screen p-4">
      <section className="flex flex-col gap-4 justify-between h-full">
        {childrenData ? (
          <>
            <ChildrenList
              childrenData={paginatedData}
              reloadData={handleReload}
            />
            <Paginator
              currentPage={pagination}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div>No children data available.</div>
        )}
      </section>
    </div>
  );
}
