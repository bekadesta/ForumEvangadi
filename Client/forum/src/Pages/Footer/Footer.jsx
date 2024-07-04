
import React from 'react'
import Flogo from '../../Assets/evangadi-logo-5fea54cc.png'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import classes from './Footer.module.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
		<section className={classes.main_footer}>
			<div className={classes.footer}>
				<div className={classes.logo_icon}>
					<div>
						{/* Logo */}
						<img src={Flogo} alt="Logo" />
					</div>
					<div className={classes.icons}>
						{/* icons */}
						<div>
							<FaFacebook size={25} />
						</div>
						<div>
							<FaSquareInstagram size={25} />
						</div>
						<div>
							<TiSocialYoutubeCircular size={30} />
						</div>
					</div>
				</div>
				<div>
					<h2>Useful Link</h2>
					<ul>
						<li>
							<Link to={"#"}>How it works</Link>
						</li>
						<li>
							<Link to={"/Terms"}>Terms of Service </Link>
						</li>
						<li>
							<Link to={"/Terms"}>Privacy policy</Link>
						</li>
					</ul>
				</div>
				<div>
					<h2>Contact Info</h2>
					<ul>
						<li>
							<Link to={"#"}>Evangadi Networks</Link>
						</li>
						<li>
							<Link to={"#"}>support@evangadi.com</Link>
						</li>
						<li>
							<Link to={"#"}>+1-202-386-2702</Link>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}

export default Footer
