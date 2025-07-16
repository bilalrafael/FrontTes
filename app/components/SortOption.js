"use client";

const SortOptions = ({ perPage, setPerPage, sort, setSort }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <label className="mr-2 font-semibold">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="-published_at">Newest</option>
          <option value="published_at">Oldest</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Items per page:</label>
        <select
          value={perPage}
          onChange={(e) => setPerPage(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;
