import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Search, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import DownloadSheetButton from "../../Download/DownloadSheetButton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedPurposeId, setExpandedPurposeId] = useState(null);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchItems();
  }, [currentPage, searchTerm]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get(
        `api/equipment?page=${currentPage}&limit=9&search=${searchTerm}`
      );
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  const fetchSuggestions = async (input) => {
    if (input.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await axiosPublic.get(
        `/api/equipment/suggestions?search=${input}`
      );
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    fetchSuggestions(input);
  };

  const handleSuggestionClick = (itemId) => {
    setShowSuggestions(false);
    setSearchInput("");
    navigate(`/equipment/${itemId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCollect = (id) => {
    navigate(`/equipment/${id}/collect`);
  };

  const handleReturn = (id) => {
    navigate(`/equipment/${id}/return`);
  };

  // Gradients for card backgrounds
  const gradients = [
    "bg-gradient-to-br from-indigo-500 to-purple-600",
    "bg-gradient-to-br from-pink-500 to-red-500",
    "bg-gradient-to-br from-blue-400 to-cyan-500",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="ml-2 text-xl font-medium text-gray-700">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="container bg-gradient-to-br from-indigo-500 via-sky-400 to-teal-500 mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mt-20 mb-8 text-center border-b-2 pb-2">
        🛠️ Equipment Inventory
      </h1>
      <div className="flex justify-center items-center mb-8">
        <DownloadSheetButton />
      </div>

      {/* Search Bar with Suggestions */}
      <div className="relative mb-10 w-full max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search equipment by name, description, or purpose..."
              value={searchInput}
              onChange={handleSearchInputChange}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => {
                if (searchInput.length >= 2 && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-xl shadow-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-br from-blue-700 to-blue-400 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md"
          >
            Search
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
            {suggestions.map((item) => (
              <li
                key={item._id}
                onMouseDown={() => handleSuggestionClick(item._id)}
                className="flex items-center p-3 cursor-pointer hover:bg-indigo-50 transition duration-150 border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={`https://my-varsity-projects-server.onrender.com/uploads/${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-full mr-3 border border-gray-200"
                />
                <span className="text-gray-800 font-medium truncate">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={item._id}
              className={`equipment-card rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ${
                gradients[index % gradients.length]
              }`}
            >
              <div className="p-10 flex flex-col justify-between h-full">
                <div className="flex-shrink-0 mb-4">
                  <div className="w-full h-40 flex justify-center items-center bg-white/30 backdrop-blur-sm rounded-lg p-2 mb-4">
                    <img
                      src={`https://my-varsity-projects-server.onrender.com/uploads/${item.image}`}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                      Available:
                    </span>
                    <div className="mt-1">
                      <span className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full font-bold text-xl">
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mt-1 italic">
                    {/* Determine the content to display */}
                    {item.purpose.length > 70 && expandedPurposeId !== item._id
                      ? item.purpose.substring(0, 70) + "..." // Show truncated text
                      : item.purpose}

                    {/* Show More/Show Less button if text is long */}
                    {item.purpose.length > 70 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents card-wide click actions if any
                          setExpandedPurposeId(
                            expandedPurposeId === item._id ? null : item._id
                          );
                        }}
                        className="ml-1 font-bold text-yellow-200 hover:text-yellow-100 transition duration-150 underline"
                      >
                        {expandedPurposeId === item._id ? "Less" : "More"}
                      </button>
                    )}
                  </p>
                </div>

                <div className="flex space-x-3 mt-4">
                  {/* Collect Button with Gradient */}
                  <button
                    onClick={() => handleCollect(item._id)}
                    className={`flex-1 py-2 px-4 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 
            ${
              item.quantity === 0
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled state
                : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 hover:shadow-xl" // Enabled state with gradient
            }`}
                    disabled={item.quantity === 0}
                  >
                    Collect
                  </button>

                  {/* Return Button with Gradient */}
                  <button
                    onClick={() => handleReturn(item._id)}
                    className="flex-1 py-2 px-4 text-sm font-semibold rounded-full shadow-lg 
                   bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                   hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl 
                   transition-all duration-300"
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-3 text-center py-10 bg-gray-100 rounded-xl">
            <p className="text-xl text-gray-600 font-semibold">
              No equipment found matching your search term.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-3 rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page <strong className="text-indigo-600">{currentPage}</strong> of{" "}
          <strong className="text-indigo-600">{totalPages}</strong>
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-3 rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Home;
