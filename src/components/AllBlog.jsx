"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import { format } from "date-fns";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";

const getLimitedHTML = (html, limit = 100) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.substring(0, limit) + (text.length > limit ? "..." : "");
};

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const firestoreCategories = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const value = data.value || data.label || doc.id;
        const label = data.label || data.value || doc.id;
        return { value, label };
      });
      return firestoreCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch blogs
        const blogSnapshot = await getDocs(collection(db, "blogs"));
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        blogList.sort(
          (a, b) =>
            (b?.createdAt?.toMillis?.() || 0) -
            (a?.createdAt?.toMillis?.() || 0)
        );
        setBlogs(blogList);

        // Fetch categories
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const predefinedCategories = useMemo(
    () => categories.map((c) => c.value),
    [categories]
  );

  const otherCategories = useMemo(() => {
    const unknowns = blogs
      .map((b) => b.category)
      .filter((cat) => cat && !predefinedCategories.includes(cat));
    return [...new Set(unknowns)];
  }, [blogs, predefinedCategories]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        !category ||
        (category === "__other__"
          ? !predefinedCategories.includes(blog?.category)
          : blog?.category?.includes(category));

      const matchesSearch =
        !search ||
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog?.category?.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, category, search, predefinedCategories]);

  return (
    <div className="min-h-screen p-6 bg-[#121212]">
      <h2 className="text-3xl font-bold mb-6 text-center text-white mt-6">
        Latest Blogs
      </h2>

      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
            id="category"
            className="text-black border p-2 pr-8 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cate, index) => (
              <option key={index} value={cate.value}>
                {cate.label}
              </option>
            ))}
            {otherCategories.length > 0 && (
              <option value="__other__">Other</option>
            )}
          </select>
        </div>

        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="text-black border p-2 pr-10 w-full rounded"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-white">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-white">No blogs available.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {filteredBlogs.map((blog) => {
              const limitedText = getLimitedHTML(blog.value, 40);

              return (
                <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
                  <div className="bg-gray-900 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
                    <div className="overflow-hidden w-full h-40 object-cover rounded-md">
                      <Image
                        src={blog.image || "/placeholder.jpg"}
                        alt={blog.title}
                        width={400}
                        height={160}
                        className="w-full h-40 object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[#9ca4b0] flex items-center gap-3">
                          <SlCalender />
                          <span>
                            {blog.createdAt?.seconds
                              ? format(
                                  new Date(blog.createdAt.seconds * 1000),
                                  "PPP"
                                )
                              : "Date not available"}
                          </span>
                        </p>
                        <FaCopy
                          className="cursor-pointer text-[#9ca4b0] hover:text-[#705df2] transition"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const blogUrl = `${window.location.origin}/blog/${blog.id}`;
                            navigator.clipboard.writeText(blogUrl).then(() => {
                              alert("Blog URL copied to clipboard!");
                            });
                          }}
                        />
                      </div>

                      <h3 className="text-lg font-semibold text-white mt-2">
                        {blog.title}
                      </h3>

                      <div
                        className="w-full mt-2 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: limitedText }}
                      />

                      <span className="text-[#9ca4b0] flex items-center gap-3 mt-6 hover:text-blue-700 transition-colors duration-300 ease-in-out">
                        Read More
                        <FaArrowRightLong className="group-hover:text-blue-700" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
