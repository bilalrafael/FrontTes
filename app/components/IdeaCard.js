"use client";

import { useEffect, useState } from "react";
import { fetchIdeas } from "../utils/api";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const IdeaCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ideas, setIdeas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 10;
  const sort = searchParams.get("sort") || "-published_at";

  const updateQueryParams = (params) => {
    const query = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      query.set(key, value);
    });
    router.push(`?${query.toString()}`);
  };

  useEffect(() => {
    const getIdeas = async () => {
      try {
        const data = await fetchIdeas({ page, size: perPage, sort });
        setIdeas(data.data);
        setTotalPages(Math.ceil(data.meta.total / perPage));
      } catch (err) {
        console.error(err);
      }
    };
    getIdeas();
  }, [page, perPage, sort]);

  const renderPagination = () => {
    const pagesToShow = 5;
    let start = Math.max(1, page - Math.floor(pagesToShow / 2));
    let end = Math.min(totalPages, start + pagesToShow - 1);
    if (end - start < pagesToShow - 1) {
      start = Math.max(1, end - pagesToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => updateQueryParams({ page: i })}
          className={`px-3 py-1 rounded ${
            i === page ? "bg-orange-500 text-white" : "bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQueryParams({ page: Math.max(1, page - 1) })}
          disabled={page === 1}
          className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          &laquo;
        </button>
        {pages}
        <button
          onClick={() => updateQueryParams({ page: Math.min(totalPages, page + 1) })}
          disabled={page === totalPages}
          className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Sort & PerPage */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <label>
            Show per page:
            <select
              value={perPage}
              onChange={(e) => updateQueryParams({ perPage: e.target.value, page: 1 })}
              className="ml-2 border rounded px-2 py-1"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by:
            <select
              value={sort}
              onChange={(e) => updateQueryParams({ sort: e.target.value, page: 1 })}
              className="ml-2 border rounded px-2 py-1"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </label>
        </div>

        <div className="text-sm">
          Showing {(page - 1) * perPage + 1} -{" "}
          {Math.min(page * perPage, totalPages * perPage)} of {totalPages * perPage}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white border rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={idea?.small_image?.url || "/bahan 2.webp"}
                alt={idea.title}
                fill
                loading="lazy"
                style={{ objectFit: "cover" }}
                className="rounded-t"
              />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 mb-1 uppercase">
                {new Date(idea.published_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-sm font-semibold line-clamp-3">{idea.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">{renderPagination()}</div>
    </div>
  );
};

export default IdeaCard;
