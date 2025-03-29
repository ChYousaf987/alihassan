'use client'
import React from "react";
import "../styles/Works.css";
import { motion } from "framer-motion";
import { ReactData } from "../data/WorkData.jsx";
import WorkCard from "./WorkCard.jsx";

const Work = () => {
	const fade = {
		opacity: 1,
		transition: {
			duration: 1.4,
		},
	};

	return (
		<div className='works' id='portfolio'>
			<div className='container my-6 py-8'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="heading flex justify-center items-center text-center"
				  >
					<h2 className="text-2xl font-semibold mb-6 relative inline-block before:content-[''] before:w-16 before:h-1 before:bg-purple-500 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2">
					  Portfolio
					</h2>
				  </motion.div>
			
				<motion.div
					className='works-box'
					initial={{ opacity: 0 }}
					whileInView={fade}>
					{ReactData.map((w, index) => (
						<WorkCard w={w} key={index} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Work;
