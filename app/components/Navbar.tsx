import React from "react";
import Link from "next/link";
import { useAuth } from "../context/auth"; // Corrected import statement

const Navbar = () => {
  const { login, logout } = useAuth();

  return (
    <header className="bg-gray-700 p-4 sm:bg-red-200 md:bg-orange-200 lg:bg-blue-200 xl:bg-green-200 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="text-2xl font-medium">
            SNS Clone
          </Link>
        </h1>
        <nav>
          <ul className="">
            <div className="flex gap-x-2">
              <Link
                href="/auth/login"
                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
              >
                ログイン
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
              >
                サインアップ
              </Link>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
