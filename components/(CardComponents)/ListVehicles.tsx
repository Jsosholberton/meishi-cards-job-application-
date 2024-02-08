import UniversalCardComponent from './UniversalCardComponent'

function ListVehicles({ data, func }: { data: any, func: any }) {

  return (
    <div className="grid grid-cols-12 gap-2">
      {data?.map((vehicle: any, index: React.Key | null | undefined) => (
        <UniversalCardComponent key={index} data={vehicle} func={func} allData={data} />
      ))}
    </div>
  )
}

export default ListVehicles
