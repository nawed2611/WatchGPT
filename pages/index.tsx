import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { RoughNotation } from 'react-rough-notation';
import Layout from './layout';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    answer: ''
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios.get(`http://localhost:3000/api/hello?query=${query}`)
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
  }

  return (
    <Layout className='overflow-hidden'>
      <div className="flex ring flex-col h-screen items-center justify-center">
        <Toaster />
        <RoughNotation animationDelay={1000} animationDuration={2000} type="box" show={true}>
          <h1 className="font-bold text-8xl">WatchGPT</h1>
        </RoughNotation>
        <p className="mt-4 text-xl">Dont just scroll Netflix!</p>

        <form className='mt-4 flex gap-x-4' onSubmit={handleSubmit}>
          <input type='text' className='focus:outline-none form-input rounded-sm p-2' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Enter your Query' />
          <button type='submit'>Submit</button>
        </form>
        <div className='mt-12'>
          {
            loading && <p className=''>Loading...</p>
          }
          {
            data && <ul className='flex flex-col '>
              <li>{data.answer}</li>
            </ul>
          }
        </div>

      </div>
    </Layout>
  )
}
