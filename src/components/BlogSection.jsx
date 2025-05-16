"use client";
import { useEffect, useRef, useState } from "react";
import { useAnimation, useInView } from "framer-motion";
import SectionHead from "./SectionHead";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

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
  const [showButton, setShowButton] = useState(false);

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

        if (blogList.length > 6) {
          setShowButton(true);
          setBlogs(blogList.slice(0, 6)); // show first 6
        } else {
          setShowButton(false);
          setBlogs(blogList); // show all
        }
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
      className="scroll-mt-[80px] min-h-[60vh] relative px-4 md:px-8 pt-4 font-montserrat"
    >
      <div className="relative z-10">
        <SectionHead>Blogs</SectionHead>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#152b5a]">
            Latest Blogs
          </h2>

          {loading ? (
            <p className="text-center">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center">No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-20">
              {blogs.map((blog) => {
                const limitedText = getLimitedHTML(blog.value, 100);
                return (
                  <div key={blog.id}>
                    <div className="rounded-2xl z-20 bg-[#] shadow-md hover:shadow-lg transition overflow-hidden">
                      <div className="w-full h-48 overflow-hidden">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          width={600}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                          priority={false}
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-[#9ca4b0] text-sm flex items-center gap-2 mb-2">
                          <SlCalender />
                          {format(
                            new Date(blog.createdAt.seconds * 1000),
                            "PPP"
                          )}
                        </p>
                        <Link href={`/blog/${blog.id}`}>
                          <h3 className="text-xl font-semibold text-[#152b5a] hover:text-[#705df2] transition-colors mb-2">
                            {blog.title}
                          </h3>
                        </Link>
                        <div
                          dangerouslySetInnerHTML={{ __html: limitedText }}
                          className="text-gray-400 text-sm"
                        />
                        <Link
                          href={`/blog/${blog.id}`}
                          className="inline-flex items-center gap-2 text-[#705df2] font-medium mt-4 hover:underline"
                        >
                          Read More <FaArrowRightLong />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show "View More" only if more than 6 blogs exist */}
          {showButton && (
            <div className="flex justify-center mt-5">
              <button
                onClick={() => router.push("/allblogs")}
                className="bg-[#004AAD] px-8 py-3 text-white rounded-md hover:bg-[#5948c3] transition"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
