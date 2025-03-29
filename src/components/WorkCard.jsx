import React from "react";
import { FiDownload, FiFolder, FiGithub } from "react-icons/fi";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const WorkCard = ({ w, tabId }) => {
	return (
		<div className="works-card">
			<div className="works-container">
				<div className="top-work">
					<FiFolder className="work-folder" />
					<div className="right">
						{w.gitlink && (
							<a className="work-git" href={w.gitlink} target="_blank" rel="noopener noreferrer">
								<FiGithub />
							</a>
						)}
						{tabId === "react-native" ? (
							<a href={w.app} download={w.title} target="_blank" rel="noopener noreferrer" className="work-link">
								<FiDownload />
							</a>
						) : (
							<a href={w.site} target="_blank" rel="noopener noreferrer" className="work-link">
								<IoOpenOutline />
							</a>
						)}
					</div>
				</div>
				<div className="mid-work">
					<p className="work-title">{w.title}</p>
					<p className="work-desc">{w.desc}</p>
				</div>
				<div className="bottom-work">
					{w.tech.map((e, index) => (
						<small key={index}>{e}</small>
					))}
				</div>
			</div>
		</div>
	);
};

export default WorkCard;
