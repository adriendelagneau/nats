"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { IGetArticlesResponse, TArticle } from '@/types';
import { getArticles } from '@/actions/articlesActions';
import MainCard from './cards/MainCard';

let page = 2;

const InfinitScroll = ({ totalPages }: IGetArticlesResponse) => {
    // Get current search parameters and initialize variables
    const searchParams = useSearchParams();
    const { ref, inView } = useInView();
    const [data, setData] = useState<TArticle[]>([]);

    // Extract pagination and filtering parameters from searchParams
    const limit = 6;
    const query = searchParams?.get("query") || "";
    const category = searchParams?.get("category") || "";
    const subcategory = searchParams?.get("subcategory") || "";
    // const sort = searchParams?.get("sort") || "";


    // Effect to fetch more products when component comes into view
    useEffect(() => {
        if (inView) {
            getArticles({page, limit, category, subcategory, query })
                .then((res) => {
                    console.log(res, "xx")
                    // Update data and increment page for the next fetch
                    setData((prevData) => [...prevData, ...res.data]);
                    page++;
                });
        }
    }, [inView]);

    // Effect to reset data and page when searchParams change (e.g., category selection)
    useEffect(() => {
        setData([]); // Reset data
        page = 2; // Reset page to initial value
    }, [searchParams]);

    return (
        <div className=' m-auto mt-5 max-w-screen-2xl'>

            <ul className="w-full">
                {data.map((article, index) => (
                    <li key={index} className="flex justify-center">
                        <MainCard article={article} />
                    </li>
                ))}
            </ul>

            {page - 1 < totalPages && (
                <div className='w-full h-24 bg-red-800 pb-28 ' ref={ref}>
                   
                </div>
            )}
        </div>
    );
}

export default InfinitScroll;
