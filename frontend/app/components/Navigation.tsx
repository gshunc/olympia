"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBook,
  faInfoCircle,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Programs",
    message: "Explore our academic programs",
    href: "/programs",
    isReferrer: false,
    fa: faGraduationCap,
  },
  {
    name: "Courses",
    message: "Browse our course offerings",
    href: "/courses",
    isReferrer: false,
    fa: faBook,
  },
  {
    name: "About",
    message: "Learn about Olympia Academy",
    href: "/about",
    isReferrer: false,
    fa: faInfoCircle,
  },
  {
    name: "Contact",
    message: "Get in touch with us",
    href: "mailto:info@olympia-academy.edu",
    isReferrer: true,
    fa: faEnvelope,
  },
];

const miniLinks = [
  {
    name: "Faculty",
    message: "Meet our distinguished faculty",
    href: "/faculty",
    isReferrer: false,
    fa: null,
  },
  {
    name: "Resources",
    message: "Student and learning resources",
    href: "/resources",
    isReferrer: false,
    fa: null,
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex lg:flex-col lg:content-center pb-2 lg:pb-0 lg:pt-10 rounded-t-lg lg:rounded-none border-l-2 border-t-2 border-r-2 lg:border-t-0 lg:border-r-0 lg:w-72 lg:overflow-y-auto gold-border">
      <div className="flex flex-row justify-between w-screen lg:space-x-0 mt-5 lg:mt-12 pl-3 pr-3 lg:pl-8 lg:pr-8 lg:container lg:grid lg:grid-cols-1 lg:text-left lg:float-right">
        {routes.map((link) => (
          <Link
            href={link.href}
            className="ml-1 mr-1 lg:ml-0 lg:mr-0 group rounded-lg lg:border lg:border-transparent lg:px-5 lg:py-4 transition-colors hover:border-gray-200 hover:bg-gray-100"
            target={link.isReferrer ? "_blank" : "_self"}
            rel={link.isReferrer ? "noopener noreferrer" : ""}
            key={link.name}
          >
            <h2
              className={`text-xs flex flex-col text-center font-semibold lg:text-left lg:text-lg lg:block`}
            >
              {link.fa && (
                <FontAwesomeIcon icon={link.fa} className="text-amber-600" />
              )}{" "}
              {link.name}{" "}
              <span className="hidden lg:inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none gold-text">
                -&gt;
              </span>
            </h2>
            <p className={`hidden lg:block max-w-[30ch] text-sm opacity-50`}>
              {link.message}
            </p>
          </Link>
        ))}
        {pathname != "/" && (
          <Link
            href="/"
            className="block group rounded-lg lg:border lg:px-5 lg:py-4 transition-colors hover:bg-gray-100"
          >
            <h2
              className={`text-xs flex flex-col lg:block lg:text-lg font-semibold`}
            >
              <FontAwesomeIcon icon={faHome} className="text-amber-600" /> Home
              <span className="hidden lg:inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none gold-text">
                -&gt;
              </span>
            </h2>
          </Link>
        )}
      </div>
      <div className="flex flex-row justify-between w-screen lg:space-x-0 lg:mt-12 pl-3 pr-3 lg:pl-8 lg:pr-8 lg:container lg:grid lg:grid-cols-1 lg:text-left lg:float-right">
        <p className="font-base font-semibold px-5 gold-text">Resources</p>
        {miniLinks.map((link) => (
          <Link
            href={link.href}
            className="ml-1 mr-1 lg:ml-0 lg:mr-0 group rounded-lg lg:border lg:border-transparent lg:px-5 lg:py-2 transition-colors hover:border-gray-200 hover:bg-gray-100"
            target={link.isReferrer ? "_blank" : "_self"}
            rel={link.isReferrer ? "noopener noreferrer" : ""}
            key={link.name}
          >
            <h2
              className={`text-xs flex flex-col text-center font-semibold lg:text-left lg:text-sm lg:block`}
            >
              {link.name}{" "}
              <span className="hidden lg:inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none gold-text">
                -&gt;
              </span>
            </h2>
            <p className={`hidden lg:block max-w-[30ch] text-sm opacity-50`}>
              {link.message}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
