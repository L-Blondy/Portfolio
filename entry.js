import "./src/SCSS/common.scss";
import { setupNavBar } from "./src/JS/navbar.js";
import { setupServices } from "./src/JS/services.js";
import { setupDotAnim } from "./src/JS/dotAnim.js";
import { ResizeHandler } from "./src/JS/portfolio/ResizeHandler.js";
import { Videos } from "./src/JS/portfolio/Videos.js";
import { Images } from "./src/JS/portfolio/Images.js";
import { setup_showPhone } from "./src/JS/showPhone.js";
import LazyLoader from 'lb-lazy-images';
import { fix_VH, fix_HashNav, getMediaSources } from "./src/utils";

LazyLoader.loadOnScroll('.profile-bg__img', { rootMargin: '200px 200px 200px 200px' });

let skills = document.querySelectorAll(".profile-content__skills-skill span");
let myData = document.querySelectorAll(".contact-content__intro--data .personal-data");

setupNavBar();
setupServices();
setupDotAnim(skills, 2);
setupDotAnim(myData, 1);
setup_showPhone();
fix_HashNav();

let sources = getMediaSources(require("./src/assets/portfolio-media/*.*"));
const videos = new Videos(sources);
const images = new Images(sources);
const resizeHandler = new ResizeHandler({ "video": () => videos.load(), "image": () => images.load() });

function handleResize() {
	fix_VH();
	if (window.matchMedia("(max-width:1199.8px)").matches) {
		resizeHandler.setState("image");
	}
	else if (window.matchMedia("(min-width:1200px)").matches) {
		resizeHandler.setState("video");
	}
}
handleResize();
window.addEventListener("resize", handleResize);

