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
import { FaArrowRightLong, FaCopy } from "react-icons/fa6";
import Image from "next/image";
import CustomToast from "./CustomToast"; // ✅ Toast import

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

  // ✅ Toast state
  const defaultToastState = {
    visible: false,
    message: null,
    severity: "success",
  };
  const [toast, setToast] = useState(defaultToastState);

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
      className="scroll-mt-[80px] min-h-[60vh] relative bg-[#0D1224] text-white px-4 md:px-8 pt-4 font-montserrat"
    >
      {/* Background image */}
      <div
        className="absolute top-0 left-0 w-full h-full min-h-screen z-0 bg-no-repeat bg-cover bg-center bg-blend-overlay"
        style={{
          backgroundImage: `url('https://abusaid.netlify.app/hero.svg')`,
        }}
      ></div>

      <div className="relative z-10">
        <SectionHead>Blogs</SectionHead>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#eaebed]">
            Latest Blogs
          </h2>

          {loading ? (
            <p className="text-center">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center">No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-20">
              {blogs.map((blog) => {
                const limitedText = getLimitedHTML(blog.value, 60);
                return (
                  <div key={blog.id}>
                    <div className="rounded-2xl z-20 bg-[#070a20] shadow-md hover:shadow-lg transition overflow-hidden">
                      <Link href={`/blog/${blog.id}`}>
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
                          <div className="flex items-center justify-between">
                            <p className="text-[#9ca4b0] text-sm flex items-center gap-2 mb-2">
                              <SlCalender />
                              {format(
                                new Date(blog.createdAt.seconds * 1000),
                                "PPP"
                              )}
                            </p>
                            <FaCopy
                              className="cursor-pointer text-[#9ca4b0] hover:text-[#705df2] transition"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const blogUrl = `${window.location.origin}/blog/${blog.id}`;
                                navigator.clipboard
                                  .writeText(blogUrl)
                                  .then(() => {
                                    setToast({
                                      visible: true,
                                      message: "Link copied to clipboard!",
                                      severity: "success",
                                    });

                                    setTimeout(() => {
                                      setToast(defaultToastState);
                                    }, 2000);
                                  });
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-white transition-colors mb-2">
                            {blog.title}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{ __html: limitedText }}
                            className="text-gray-400 text-sm"
                          />
                          <div className="inline-flex items-center gap-2 text-[#705df2] font-medium mt-4 hover:underline">
                            Read More <FaArrowRightLong />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {showButton && (
            <div className="flex justify-center mt-5">
              <button
                onClick={() => router.push("/allblogs")}
                className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-8 py-3 text-white rounded-md hover:bg-[#5948c3] transition"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Toast rendering */}
      {toast.visible && (
        <div className="fixed top-5 right-5 z-[9999]">
          <CustomToast
            severity={toast.severity}
            message={toast.message}
            handleClose={() => setToast(defaultToastState)}
          />
        </div>
      )}
    </section>
  );
};

export default BlogSection;
