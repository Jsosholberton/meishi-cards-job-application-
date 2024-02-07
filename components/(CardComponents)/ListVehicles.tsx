"use client"

// State
import { useState } from 'react'

// Component
import UniversalCardComponent from './UniversalCardComponent'

function ListVehicles({ data }: { data: any }) {

  const [vehicles, setVehicles] = useState(data)

  return (
    <div className="grid grid-cols-12 gap-2">
      {vehicles?.map((vehicle: any, index: React.Key | null | undefined) => (
        <UniversalCardComponent key={index} data={vehicle} func={setVehicles} allData={vehicles} />
      ))}
    </div>
  )
}

export default ListVehicles
