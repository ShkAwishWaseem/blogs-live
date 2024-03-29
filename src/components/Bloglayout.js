import React, { useState } from "react";
import { useRouter } from "next/router";
import useFetch from "./useFetch";
import ScrollToTopButton from "./STT";
import Homecards from "./Homecards";
import Footer from "./Footer";
import Image from "next/image";

const Bloglayout = (props) => {
  // const { data, loading } = useFetch(
  //   "https://newsapi.org/v2/everything?q=apple&from=2024-01-30&to=2024-01-30&sortBy=popularity&apiKey=4d148f78929e4659853fa1b3c7a4bc98"
  // );
  const {data,loading} = useFetch("/api/getdata");
  const [search, setInputdata] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const text = e.target.value;
    const newText = text.toLowerCase();
    setInputdata(newText);
    console.log(newText);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/category/${search}`);
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-20">Trending Topics</h1>
        {loading ? (
          <>
            <div className="loader text-center mt-5">
              <button
                disabled
                type="button"
                className="text-center py-2.5 px-5 me-2 text-sm font-medium text-gray-900  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#00796b"
                  />
                </svg>
                Loading...
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="main-container ">
          <div className="container mx-auto w-[50%] bg-transparent">
            <form onSubmit={handleSearch} className="bg-transparent">
              <input
              
                type="text"
                placeholder="Search topics"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 search-input"
                value={search}
                onChange={handleInputChange}
              />
              <button
                className="mt-4 px-5 py-2 text-sm tracking-wide text-white transition-colors  duration-200 rounded-lg shrink-0 sm:w-auto primary-btn search-btn"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <div>
            {data &&
              data.map((item) => (
                <div key={item._id}>
                  <Homecards
                    img_url={item.img_url}
                    content={item.content}
                    headline={item.headline}
                    createdAt={item.createdAt}
                    Id={item._id}
                    category={item.category}
                    createdBy={item.createdBy}
                  />
                </div>
              ))}
          </div>
          
        </div>
      </div>
      <Footer/>
      <ScrollToTopButton />
    </>
  );
};

export default Bloglayout;
