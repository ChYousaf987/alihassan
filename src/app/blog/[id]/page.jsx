import BlogDetail from '@/components/details';
import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase";

export async function generateStaticParams() {
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogList = querySnapshot.docs.map((doc) => ({
            id: doc.id, 
        }));

        return blogList;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

const DetailPage = () => {
    return <BlogDetail />
};

export default DetailPage;
