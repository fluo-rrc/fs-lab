import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  // Helper for active link styling
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-800 font-bold border-b-2 border-blue-800"
      : "text-gray-600 hover:text-blue-600 font-medium";

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/employees" className="flex-shrink-0">
          <img src={logo} alt="Pixell River Logo" className="h-16 w-auto" />
        </Link>

        <div className="hidden md:block text-center flex-1 px-4">
          <h1 className="text-xl font-bold text-blue-900">
            Pixell River Financial
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Employee Directory
          </p>
        </div>

        <div className="flex gap-6">
          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>
          <NavLink to="/organization" className={linkClass}>
            Organization
          </NavLink>

          <SignedOut>
            <div className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
              <SignInButton mode="modal" />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
