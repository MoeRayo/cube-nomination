import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCubeAcademyGetAllNominations } from "../../api/nominationsComponents";
import { getAuthToken } from "../../utils/authHelper";
import cubelogo from "../../assets/3sc-logo.svg";
import folder from "../../assets/folder.svg";
import emblem from "../../assets/emblem.svg";
import plus from "../../assets/plus.svg";

const Header = () => {
	const [numberOfNominations, setNumberOfNominations] = useState(0);
	useEffect(() => {
		const fetchNominationsCount = async () => {
			try {
				const count = await fetchCubeAcademyGetAllNominations({
					headers: {
						Authorization: `Bearer ${getAuthToken()}`,
					},
				});

				setNumberOfNominations(count.data.length);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchNominationsCount();
	}, [numberOfNominations]);
	return (
		<header className="bg-black flex justify-between items-center px-5 py-4 md:py-0">
			<div>
				<Link to="/">
					<img src={cubelogo} alt="" className="hidden md:block" />
				</Link>
				<Link to="/">
					<img
						src={emblem}
						alt=""
						className="block md:hidden justify-self-start"
					/>
				</Link>
			</div>

			<div>
				<Link to="/select-nominee">
					<img
						src={plus}
						alt=""
						className="inline-block md:hidden mr-5 cursor-pointer"
					/>
				</Link>
				<Link to="/view-nominations">
					<img
						src={folder}
						alt=""
						className="inline-block md:hidden cursor-pointer"
					/>
				</Link>
			</div>
			<Link
				to="/view-nominations"
				className="text-white underline text-xs font-AnonymousPro hidden md:block">
				Your nominations ({numberOfNominations})
			</Link>
		</header>
	);
};

export default Header;
