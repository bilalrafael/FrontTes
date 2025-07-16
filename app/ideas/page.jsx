"use client";

import { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import SortOptions from "../components/SortOptions";
import Pagination from "../components/Pagination";
import axios from "axios";

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [total, setTotal] = useState(0);

  const fetchIdeas = async () => {
    const res = await axios.get("https://suitmedia-backend.suitdev.com/api/ideas", {
      params: {
        "page[number]": page,
        "page[size]": perPage,
        append: ["small_image", "medium_image"],
        sort: sort,
      },
    });
    setIdeas(res.data.data);
    setTotal(res.data.meta.total);
  };

  useEffect(() => {
    fetchIdeas();
  }, [page, perPage, sort]);

  return (
    <div className="px-6 py-24 space-y-6">
      <SortOptions
        perPage={perPage}
        setPerPage={setPerPage}
        sort={sort}
        setSort={setSort}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalItems={total}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default IdeasPage;
