import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { RoughNotation } from 'react-rough-notation';
import Layout from './layout';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ answer: [] });
  const [movieData, setMovieData] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios.get(`https://watchgpt.vercel.app/api/hello?query=${query}`)
      .then(res => {
        setData(res.data);
        console.log('lol', data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })

    if (data.answer.length) {
      axios.get(`https://www.omdbapi.com/?t=${data.answer[0]}&apiKey=${process.env.NEXT_PUBLIC_OMDB_KEY}`)
        .then(res => {
          console.log('1', res.data);
        })
        .catch(err => {
          console.log(err);
        })
      axios.get(`https://www.omdbapi.com/?t=${data.answer[1]}&apiKey=${process.env.NEXT_PUBLIC_OMDB_KEY}`)
        .then(res => {
          console.log('2', res.data);
        })
        .catch(err => {
          console.log(err);
        })
      axios.get(`https://www.omdbapi.com/?t=${data.answer[2]}&apiKey=${process.env.NEXT_PUBLIC_OMDB_KEY}`)
        .then(res => {
          console.log('3', res.data);
        })
        .catch(err => {
          console.log(err);
        })
      axios.get(`https://www.omdbapi.com/?t=${data.answer[3]}&apiKey=${process.env.NEXT_PUBLIC_OMDB_KEY}`)
        .then(res => {
          console.log('4', res.data);
        })
        .catch(err => {
          console.log(err);
        })
      axios.get(`https://www.omdbapi.com/?t=${data.answer[4]}&apiKey=${process.env.NEXT_PUBLIC_OMDB_KEY}`)
        .then(res => {
          console.log('5', res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  return (
    <Layout className='overflow-hidden antialiased'>
      <div className="flex flex-col h-screen items-center justify-center">
        <Toaster />
        <motion.div
          initial={{ opacity: 0, x: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: -40 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <RoughNotation animationDelay={1000} animationDuration={2000} type="box" show={true}>
            <h1 className="font-bold text-8xl">WatchGPT</h1>
          </RoughNotation>
          <p className="mt-4 text-lg">Dont just scroll Netflix!</p>
        </motion.div>

        <form className='mt-4 flex gap-x-4 px-12' onSubmit={handleSubmit}>
          <input type='text' className='focus:outline-none bg-[#1a202c] border border-gray-500 rounded-sm p-2 w-full' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Enter a movie' />
          <button type='submit' className='border p-1  rounded-sm hover:scale-105 border-gray-500 hover:bg-gray-700 px-2 text-sm'>Search</button>
        </form>

        <div className='flex flex-col items-center justify-center mt-12 '>
          {
            loading &&
            <div className='flex relative items-center'>
              Loading...
            </div>
          }
          {
            data &&
            <ul className='flex flex-col '>
              {
                data.answer.map((item: any) => {
                  return (
                    <li key={item}>
                      {item}
                    </li>
                  )
                })
              }
            </ul>
          }
        </div>

      </div>
    </Layout>
  )
}
