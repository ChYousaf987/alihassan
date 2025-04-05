"use client";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { SlCalender } from "react-icons/sl";


export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
          const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data()});
          console.log(docSnap)
        } else {
          console.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center w-screen h-screen"><p className="text-center">Loading..</p></div>;
  if (!blog) return <div className="flex justify-center items-center w-screen h-screen"><p className="text-center">Blog not found..</p></div>

  return (
    <div className="min-h-screen mx-auto p-6 pt-20">
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="p-3">
      <div dangerouslySetInnerHTML={{ __html: blog.value }} className="w-full" />
      </div>    
      <p className="text-white flex items-center gap-3">
        <SlCalender />
        <span>
          {format(
              new Date(blog.createdAt.seconds * 1000),
              "PPP"
            )}
          </span>
      </p>
    </div>
  );
}
