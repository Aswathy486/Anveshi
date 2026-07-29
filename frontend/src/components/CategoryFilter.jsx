function CategoryFilter({ category, setCategory }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
    >
      <option value="">All Categories</option>
      <option value="Academic Items">Academic Items</option>
      <option value="Electronics">Electronics</option>
      <option value="Accessories">Accessories</option>
      <option value="Bags">Bags</option>
      <option value="Wallets">Wallets</option>
      <option value="Keys">Keys</option>
      <option value="ID Cards">ID Cards</option>
      <option value="Others">Others</option>
    </select>
  );
}

export default CategoryFilter;