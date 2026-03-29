"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Search, Loader2, X } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface IItem {
  _id: string;
  title: string;
  category: string;
  price: number;
  image?: string;
}

const ManageItemsPage = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://ai-travel-booking-platform-server.onrender.com/api/v1/items?search=${searchTerm}`,
      );
      if (response.data.success) {
        setItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchItems(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://ai-travel-booking-platform-server.onrender.com/api/v1/items/${id}`,
          );
          setItems(items.filter((item) => item._id !== id));
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            background: document.documentElement.classList.contains("dark")
              ? "#0f172a"
              : "#fff",
            color: document.documentElement.classList.contains("dark")
              ? "#fff"
              : "#1f2937",
          });
        } catch (error) {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  const handleEditClick = (item: IItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      setUpdateLoading(true);
      const response = await axios.patch(
        `https://ai-travel-booking-platform-server.onrender.com/api/v1/items/${selectedItem._id}`,
        selectedItem,
      );

      if (response.data.success) {
        setItems(
          items.map((item) =>
            item._id === selectedItem._id ? response.data.data : item,
          ),
        );
        setIsEditModalOpen(false);
        toast.success("Item updated successfully");
      }
    } catch (error) {
      Swal.fire("Error!", "Update failed.", "error");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              Manage <span className="text-blue-600">Items</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Total {items.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shrink-0">
              <Plus size={18} />{" "}
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-black tracking-widest">
              <tr>
                <th className="p-5">Product Details</th>
                <th className="p-5">Category</th>
                <th className="p-5">Price</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-blue-500"
                      size={40}
                    />
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0">
                          <img
                            src={
                              item.image || "https://via.placeholder.com/150"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-5 font-black text-blue-600 dark:text-blue-400">
                      ${item.price}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-2.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                Update Item
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={selectedItem.title}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, title: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 dark:text-white border-none p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={selectedItem.category}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      category: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 dark:text-white border-none p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={selectedItem.price}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 dark:text-white border-none p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-all shadow-lg shadow-blue-500/20"
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItemsPage;
