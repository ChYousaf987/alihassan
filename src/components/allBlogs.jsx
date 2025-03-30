"use client";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const blogCategories = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "data-science", label: "Data Science" },
    { value: "programming", label: "Programming" },
    { value: "tech-news", label: "Tech News" },
    { value: "software-engineering", label: "Software Engineering" },
    { value: "gadgets", label: "Gadgets & Reviews" },
    { value: "gaming", label: "Gaming" },
    { value: "productivity", label: "Productivity & Tools" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "self-improvement", label: "Self-Improvement" },
    { value: "finance", label: "Finance & Investing" },
    { value: "lifestyle", label: "Lifestyle & Wellness" },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        blogList.sort(
          (a, b) =>
            (b?.createdAt?.toMillis?.() || 0) -
            (a?.createdAt?.toMillis?.() || 0)
        );

        setBlogs(blogList);
        setFilteredBlogs(blogList)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    setFilteredBlogs((prev) => {
      return blogs.filter((blo) => blo?.category?.includes(category));
    });
  }, [category]);

  useEffect(() => {
    setFilteredBlogs((prev) => {
      return blogs.filter((blo) => {
        if (blo.title.includes(search) || blo?.category?.includes(search))
          return true;
      });
    });
  }, [search]);

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6 bg-black">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>

      <div className="flex justify-between">
        <div>
          <select onChange={(e) => setCategory(e.target.value)} name="" id="">
            <option value="" disabled>
              Select Category
            </option>
            {blogCategories.map((cate, index) => {
              return <option key={index} value={cate.value}>{cate.label}</option>;
            })}
          </select>
        </div>

        <div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center">No blogs available.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link href={`/blog/${blog.id}`} key={blog.id}>
                <div className="bg-black rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />

                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
