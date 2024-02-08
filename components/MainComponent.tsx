"use client"
import React, { useState } from 'react'

import UniversalCardComponent from './(CardComponents)/UniversalCardComponent'
import ListVehicles from './(CardComponents)/ListVehicles'

function MainComponent({ data }: { data: any }) {

  const [vehicles, setVehicles] = useState(data)

  return (
    <>
      <section>
        <h2 className="font-bold text-4xl mb-4">Add a new vehicle!</h2>
        <div className="md:px-10">
          <UniversalCardComponent type="create" func={setVehicles} allData={vehicles} />
        </div>
      </section>
      <section>
        <h2 className="font-bold text-4xl mb-4">List of vehicles</h2>
        <ListVehicles data={vehicles} func={setVehicles} />
      </section>
    </>
  )
}

export default MainComponent