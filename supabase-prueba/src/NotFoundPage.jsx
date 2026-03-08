import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <div>
        <h1>404 - This page doesn't exists</h1>
        <Link to={"/"}>
          <button className="bg-yellow-400 rounded-full px-2.5 py-1.5 text-sm">
            Try going back home {"->"}
          </button>
        </Link>
      </div>
    </>
  );
}
