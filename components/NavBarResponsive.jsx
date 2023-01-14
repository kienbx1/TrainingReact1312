import Link from 'next/link'
import { useRouter } from 'next/router'

const navbarOptions = [
  {
    queryName: 'all-items',
    tagName: 'Tất cả'
  },
  {
    queryName: 'adidas',
    tagName: 'Adidas'
  },
  {
    queryName: 'nike',
    tagName: 'Nike'
  },
  {
    queryName: 'converse',
    tagName: 'Converse'
  },
  {
    queryName: 'sale-off',
    tagName: 'Sale-off'
  }
]

const NavBarResponsive = () => {
  const router = useRouter()
  const { query } = router
  const { name } = query

  return (
    <div className='flex flex-col items-start mt-20 gap-6'>
      {
        navbarOptions.map((option, index) => {
          return (
            <Link
              href={{
                pathname: '/product-list',
                query: { name: option.queryName }
              }}
              key={index}
            >
              <div className={`font-bold capitalize ${name === option.queryName ? 'text-black' : 'text-[#777]'}`}>{option.tagName}</div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default NavBarResponsive
