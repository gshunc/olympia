"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBook,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
config.autoAddCss = false;

export default function Home() {
  return (
    <div className="lg:ml-40 lg:mr-40 mr-5 ml-5 flex flex-col lg:block lg:ml-0 lg:mt-5 scroll-auto lg:mr-20 pb-5 pt-20">
      <h1 className="text-4xl font-bold mb-6 gold-text">Olympia</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-xl text-center lg:text-left mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae{" "}
          <span className="gold-text">aliquam nisl nisi quis nisl</span>. Nulla
          facilisi. Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet
          nunc, vitae aliquam nisl nisi quis nisl.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border gold-border">
          <div className="text-center mb-4">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-4xl text-amber-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">
            Excellence in Education
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border gold-border">
          <div className="text-center mb-4">
            <FontAwesomeIcon
              icon={faBook}
              className="text-4xl text-amber-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">
            Comprehensive Curriculum
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border gold-border">
          <div className="text-center mb-4">
            <FontAwesomeIcon
              icon={faUsers}
              className="text-4xl text-amber-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">
            Supportive Community
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-xl text-center lg:text-left mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae
          aliquam nisl nisi quis nisl. Nulla facilisi. Sed euismod, nisl eget
          aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nisi
          quis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc,
          vitae <span className="gold-text">aliquam nisl nisi quis nisl</span>.
        </p>
      </div>

      <div className="text-center lg:text-left mb-10">
        <Link
          href="/programs"
          className="inline-block px-6 py-3 rounded-md gold-button font-bold text-white"
        >
          Explore Our Programs
        </Link>
      </div>
    </div>
  );
}
