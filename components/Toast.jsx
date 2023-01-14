const Toast = (props) => {
  return (
    <>
      <div className={`toast fixed border-l-[5px] z-50 ${props.border} border-solid top-[70%] md:top-[16%] right-0 w-[300px] max-w-[60%] mx-auto mr-7 bg-white p-8 pr-11 rounded-md shadow-3xl`}>
        <div className='flex items-center gap-7'>
          <div className='flex flex-col gap-2'>
            <p className={`font-semibold ${props.text}`}>{props.title || ''}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Toast
