import DrinkList from '@/components/DrinkList'
// import ClientCategory from '@/components/ClientCategory'

export default async function shopHome () {
  return (
    <>
      <h1 className='font-bold text-2xl drop-shadow-xs'>Drinks</h1>
      {/* <ClientCategory /> */}

      {/* 
          Statically outputs a list of non-alcoholic drinks from the server-side
       */}
      <DrinkList />
    </>
  )
}
