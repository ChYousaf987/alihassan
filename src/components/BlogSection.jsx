"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import SectionHead from "./SectionHead";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";

const getLimitedHTML = (html, limit = 100) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.substring(0, limit) + (text.length > limit ? "..." : "");
};

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animationControl = useAnimation();
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isInView) {
      animationControl.start("visible");
    }
  }, [isInView, animationControl]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        let blogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        blogList.sort(
          (a, b) =>
            (b?.createdAt?.toMillis?.() || 0) -
            (a?.createdAt?.toMillis?.() || 0)
        );
        blogList = blogList.slice(0, 3);
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blogs"
      ref={ref}
      className="scroll-mt-[80px] min-h-[60vh] px-4 md:px-8"
    >
      <SectionHead>Blogs</SectionHead>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Latest Blogs
        </h2>

        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              const limitedText = getLimitedHTML(blog.value, 100); // Replace 'content' if your field is different

              return (
                <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
                  <div className="bg-gray-900 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
                    <div className="overflow-hidden w-full h-40 object-cover rounded-md">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover rounded-md mb-2 transition-transform duration-300 ease-in-out group-hover:scale-125"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white flex items-center gap-3">
                        <SlCalender />
                        <span>
                          {format(
                            new Date(blog.createdAt.seconds * 1000),
                            "PPP"
                          )}
                        </span>
                      </p>
                      <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-blue-700">
                        {blog.title}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: limitedText }}
                        className="w-full"
                      />
                      <a
                        className="text-white flex items-center gap-3 mt-6 hover:text-blue-700 transition-colors duration-300 ease-in-out grouplink"
                        href={`/blog/${blog.id}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent navigation
                        }}
                      >
                        <span>Read More</span>
                        <FaArrowRightLong className="grouplink-hover:text-blue-700" />
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              router.push("/allblogs");
            }}
            className="bg-blue-400 px-8 py-3 text-white rounded-sm"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;