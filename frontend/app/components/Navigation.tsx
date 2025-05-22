"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHexagonNodes,
  faDiagramProject,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../login/actions";

const routes = [
  {
    name: "My Goals",
    message: "Explore your goals",
    href: "/my-goals",
    isReferrer: false,
    fa: faDiagramProject,
  },
  {
    name: "Journey",
    message: "Visualize your journey",
    href: "/journey",
    isReferrer: false,
    fa: faHexagonNodes,
  },
];

const miniLinks = [
  {
    name: "Profile",
    href: "/profile",
    isReferrer: false,
    fa: faUser,
  },
  {
    name: "Journey",
    href: "/journey",
    isReferrer: false,
    fa: faHexagonNodes,
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex pt-5 lg:h-screen lg:justify-between lg:flex-col lg:content-center pb-2 lg:pb-0 lg:pt-10 lg:pb-10 rounded-t-lg lg:rounded-none border-l-2 border-t-2 border-r-2 lg:border-t-0 lg:border-r-0 lg:w-72 lg:overflow-y-auto gold-border">
      <div className="flex flex-row justify-around lg:justify-between w-screen lg:space-x-0 lg:mt-12 pl-3 pr-3 lg:pl-8 lg:pr-8 lg:container lg:flex-col lg:text-left lg:float-right">
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
      <div className="flex flex-row items-center lg:items-start justify-around lg:flex-col lg:content-center w-screen lg:space-x-0 lg:mt-12 pl-3 pr-3 lg:pl-8 lg:pr-8 lg:container lg:text-left lg:float-right">
        <p className="font-semibold px-5 gold-text">Account</p>
        {miniLinks.map((link) => (
          <Link
            href={link.href}
            className="ml-1 mr-1 lg:ml-0 lg:mr-0 group rounded-lg lg:border lg:border-transparent lg:px-5 lg:py-2 transition-colors hover:border-gray-200 hover:bg-gray-100"
            target="_self"
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
          </Link>
        ))}
        <button
          onClick={logout}
          className="ml-1 mr-1 lg:ml-0 lg:mr-0 group rounded-lg lg:border lg:border-transparent lg:px-5 lg:py-2 transition-colors hover:border-gray-200 hover:bg-gray-100"
        >
          <h2
            className={`text-xs flex flex-col text-center font-semibold lg:text-left lg:text-sm lg:block`}
          >
            Logout{" "}
            <span className="hidden lg:inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none gold-text">
              -&gt;
            </span>
          </h2>
        </button>
      </div>
    </div>
  );
};
