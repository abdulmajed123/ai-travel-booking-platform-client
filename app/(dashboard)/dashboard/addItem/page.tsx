"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HiOutlineGlobeAlt,
  HiOutlineCurrencyBangladeshi,
  HiOutlineClock,
  HiOutlinePhotograph,
  HiOutlineMap,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlinePlusCircle,
} from "react-icons/hi";

const AddItemForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  // ইমেজের লিংক লাইভ ট্র্যাক করার জন্য
  const mainImageLink = useWatch({ control, name: "image", defaultValue: "" });
  const galleryLinks = useWatch({ control, name: "images", defaultValue: "" });

  const onSubmit = async (data: any) => {
    setLoading(true);

    const formattedData = {
      title: data.title,
      description: data.description,
      shortDescription: data.shortDescription || "",
      image: data.image,
      images: data.images?.split(",").map((i: string) => i.trim()) || [],
      price: Number(data.price),
      discountPrice: Number(data.discountPrice) || 0,
      rating: Number(data.rating) || 5,
      category: data.category,
      duration: data.duration,

      location: {
        country: data.country || "Bangladesh",
        city: data.city,
        area: data.area,
      },

      availableDates:
        data.availableDates
          ?.split(",")
          .map((d: string) => {
            const trimmedDate = d.trim();
            return trimmedDate ? new Date(trimmedDate).toISOString() : null;
          })
          .filter(Boolean) || [],

      facilities:
        data.facilities?.split(",").map((f: string) => f.trim()) || [],
      highlights:
        data.highlights?.split(",").map((h: string) => h.trim()) || [],
      aiTags: data.aiTags?.split(",").map((t: string) => t.trim()) || [],

      maxPeople: Number(data.maxPeople),
      availableSeats: Number(data.availableSeats),

      itinerary: [
        {
          day: 1,
          title: data.itineraryTitle || "Arrival",
          description: data.itineraryDesc || "Check-in hotel",
        },
      ],

      createdBy: "65f1a2b3c4d5e6f789012345",
    };

    try {
      const res = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        },
      );

      const result = await res.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "🎉 Success!",
          text: "Tour Added Successfully",
          confirmButtonColor: "#6366f1",
          background: "var(--swal-bg)",
          color: "var(--swal-text)",
        });

        reset();
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
          background: "var(--swal-bg)",
          color: "var(--swal-text)",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network সমস্যা!",
        background: "var(--swal-bg)",
        color: "var(--swal-text)",
      });
    } finally {
      setLoading(false);
    }
  };

  // Gallery ইমেজ প্রিভিউ করার জন্য
  // const getGalleryPreviews = () => {
  //   if (!galleryLinks) return [];
  //   return galleryLinks
  //     .split(",")
  //     .map((link) => link.trim())
  //     .filter((link) => link.startsWith("http"));
  // };

  const getGalleryPreviews = (): string[] => {
    if (!galleryLinks) return [];
    return galleryLinks
      .split(",")
      .map((link: string) => link.trim()) // এখানে : string যোগ করা হয়েছে
      .filter((link: string) => link.startsWith("http"));
  };
  // সাধারণ Input এবং Label ক্লাস (Tailwind)
  const labelClass =
    "block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 mb-1";
  const inputClass =
    "w-full border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl bg-gray-50/50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Publish{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Exclusive Tour
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Complete the form to publish a new travel package.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Card 1: Basic Information */}
          <div className="form-card">
            <div className="section-header">
              <HiOutlineGlobeAlt className="text-2xl text-indigo-600" />
              <h3>Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className={labelClass}>Tour Title</label>
                <input
                  {...register("title")}
                  className={inputClass}
                  placeholder="Cox's Bazar Beach Tour"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Category</label>
                <select
                  {...register("category")}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Select Category</option>
                  <option value="Beach">🏖️ Beach</option>
                  <option value="Adventure">🧗 Adventure</option>
                  <option value="Nature">🌿 Nature</option>
                  <option value="Wildlife">🐯 Wildlife</option>
                  <option value="City">🏙️ City</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Pricing & Capacity */}
          <div className="form-card">
            <div className="section-header">
              <HiOutlineCurrencyBangladeshi className="text-2xl text-emerald-600" />
              <h3>Pricing & Capacity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className={labelClass}> रेगुलर प्राइस (BDT)</label>
                <input
                  type="number"
                  {...register("price")}
                  className={inputClass}
                  placeholder="12000"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Discount Price</label>
                <input
                  type="number"
                  {...register("discountPrice")}
                  className={inputClass}
                  placeholder="10000"
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>Duration</label>
                <HiOutlineClock className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  {...register("duration")}
                  className={`${inputClass} pl-12`}
                  placeholder="3 Days 2 Nights"
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>Max Capacity</label>
                <HiOutlineUserGroup className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  type="number"
                  {...register("maxPeople")}
                  className={`${inputClass} pl-12`}
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>Available Seats</label>
                <HiOutlineUserGroup className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  type="number"
                  {...register("availableSeats")}
                  className={`${inputClass} pl-12`}
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>Rating (1-5)</label>
                <HiOutlineSparkles className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  type="number"
                  step="0.1"
                  {...register("rating")}
                  className={`${inputClass} pl-12`}
                  placeholder="4.5"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="form-card">
            <div className="section-header">
              <HiOutlineMap className="text-2xl text-rose-600" />
              <h3>Location</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Country</label>
                <select
                  {...register("country")}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>City</label>
                <input
                  {...register("city")}
                  className={inputClass}
                  placeholder="Cox's Bazar"
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Area</label>
                <input
                  {...register("area")}
                  className={inputClass}
                  placeholder="Laboni Beach"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Descriptions */}
          <div className="form-card">
            <div className="section-header">
              <HiOutlinePlusCircle className="text-2xl text-indigo-500" />
              <h3>Descriptions</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className={labelClass}>Short Description</label>
                <input
                  {...register("shortDescription")}
                  className={inputClass}
                  placeholder="A small summary..."
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Description</label>
                <textarea
                  {...register("description")}
                  className={`${inputClass} h-32`}
                  placeholder="Write full details..."
                />
              </div>
            </div>
          </div>

          {/* Card 5: Media & Preview */}
          <div className="form-card">
            <div className="section-header">
              <HiOutlinePhotograph className="text-2xl text-purple-600" />
              <h3>Media & Previews</h3>
            </div>
            <div className="space-y-6">
              {/* Main Image */}
              <div className="space-y-4 md:flex md:items-start md:gap-6 md:space-y-0">
                <div className="flex-1 space-y-2">
                  <label className={labelClass}>Main Image URL</label>
                  <input
                    {...register("image")}
                    className={inputClass}
                    placeholder="https://unsplash.com/photo-..."
                    required
                  />
                </div>
                {mainImageLink && mainImageLink.startsWith("http") && (
                  <div className="media-preview-box">
                    <img
                      src={mainImageLink}
                      alt="Main Preview"
                      className="preview-img"
                    />
                    <span className="preview-label">Main Image</span>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={labelClass}>
                    Gallery Images (comma separated URLs)
                  </label>
                  <textarea
                    {...register("images")}
                    className={`${inputClass} h-24`}
                    placeholder="url1, url2, url3"
                  />
                </div>
                {getGalleryPreviews().length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-gray-50/50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-inner">
                    {getGalleryPreviews().map((link, index) => (
                      <div
                        key={index}
                        className="media-preview-box w-full aspect-square"
                      >
                        <img
                          src={link}
                          alt={`Gallery Preview ${index + 1}`}
                          className="preview-img"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 6: Dates, Facilities & Tags */}
          <div className="form-card">
            <div className="section-header">
              <HiOutlineSparkles className="text-2xl text-amber-500" />
              <h3>Extra Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2 relative">
                <label className={labelClass}>
                  Available Dates (YYYY-MM-DD, comma separated)
                </label>
                <HiOutlineCalendar className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  {...register("availableDates")}
                  className={`${inputClass} pl-12`}
                  placeholder="2026-04-01, 2026-04-10"
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>
                  Facilities (comma separated)
                </label>
                <HiOutlineSparkles className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  {...register("facilities")}
                  className={`${inputClass} pl-12`}
                  placeholder="Hotel, Food, Guide"
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>
                  Highlights (comma separated)
                </label>
                <HiOutlineSparkles className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  {...register("highlights")}
                  className={`${inputClass} pl-12`}
                  placeholder="Sunset, Forest, Wildlife"
                />
              </div>
              <div className="space-y-2 relative">
                <label className={labelClass}>
                  AI Smart Tags (comma separated)
                </label>
                <HiOutlineSparkles className="absolute left-4 top-[46px] text-gray-400 dark:text-gray-600" />
                <input
                  {...register("aiTags")}
                  className={`${inputClass} pl-12`}
                  placeholder="adventure, nature, beach"
                />
              </div>
            </div>

            {/* Itinerary Preview */}
            <div className="p-5 bg-gray-50/50 dark:bg-[#1a1a1a] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <h4 className="font-bold text-gray-800 dark:text-white mb-4">
                Day 1 Itinerary Preview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("itineraryTitle")}
                  className={inputClass}
                  placeholder="Itinerary Title (e.g. Arrival)"
                />
                <input
                  {...register("itineraryDesc")}
                  className={inputClass}
                  placeholder="Itinerary Description"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pb-12">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-16 py-4 rounded-3xl font-bold text-lg text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl ${
                loading
                  ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/25 dark:hover:shadow-none"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "🚀 Publish Tour Package"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
