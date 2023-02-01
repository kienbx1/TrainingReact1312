import { AiOutlineSearch } from 'react-icons/ai'

const Search = (props) => {
  const searchClickHandler = () => {
    props.setIsSearchBar(!props.isSearchBar)
  }

  return (
    <div className='relative'>
      <AiOutlineSearch className='text-2xl cursor-pointer hover:scale-105 duration-500' onClick={searchClickHandler} />
      <input placeholder='Nhập vào đôi giày bạn muốn' />
    </div>
  )
}

export default Search
