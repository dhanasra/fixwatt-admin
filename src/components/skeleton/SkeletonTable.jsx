import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonTable = ()=>{
  return (
    <div>
        <Skeleton height={65}/>
        <Skeleton height={65}/>
        <Skeleton height={65}/>
        <Skeleton height={65}/>
        <Skeleton height={65}/>
    </div>
  )
}

export default SkeletonTable