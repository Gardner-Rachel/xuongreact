import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm.trim()) return;
        // Chuyển hướng đến trang SearchPage với từ khóa tìm kiếm
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form className="w-[456px] flex *:h-[48px] justify-between" onSubmit={handleSearch}>
            <input
                type="text"
                className="border rounded-full w-[400px] px-6"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="rounded-[50%] bg-[#17af26] w-[48px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-white mx-auto"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default FormSearch;
