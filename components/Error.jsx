const Error = () => {
  return (
    <div className='p-40'>
      <div className='flex gap-6 items-end mb-12'>
        <p className='text-7xl font-semibold text-gray-500'>500</p>
        <p className='text-5xl font-semibold text-red-500 capitalize'>server error</p>
      </div>
      <p className='mb-4 text-2xl text-gray-600'>Oops, something went wrong.</p>
      <p className='text-2xl text-gray-600'>Try to refresh this page or feel free to contact us if the problem persists</p>
    </div>
  )
}

export default Error
