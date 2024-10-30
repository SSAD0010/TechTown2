import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex gap-2">
    loading...
    <Loader2 className="animate-spin" />
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    
  </div>
  )
}
