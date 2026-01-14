import { unstable_cache } from 'next/cache';
import React from 'react'
import HeaderSec from './Header';
import { fetchHeaderData } from '../services/headerSevice';

export default async function HeaderWrapper() {

     const headerData = await fetchHeaderData();
      
  return (
    <HeaderSec headerData= {headerData}/>
  )
}
