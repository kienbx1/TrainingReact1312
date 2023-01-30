import Link from 'next/link'
import { useRouter } from 'next/router'

const NavBarResponsive = () => {
  const router = useRouter()

  return (
    <div className='flex flex-col items-start mt-20 gap-6'>
      <Link href='/all-items'>
        <div className={`font-bold capitalize ${router.pathname === '/all-items' ? 'text-black' : 'text-[#777]'}`}>Tất cả</div>
      </Link>
      <Link href='/adidas'>
        <div className={`font-bold capitalize ${router.pathname === '/adidas' ? 'text-black' : 'text-[#777]'}`}>Adidas</div>
      </Link>
      <Link href='/nike'>
        <div className={`font-bold capitalize ${router.pathname === '/nike' ? 'text-black' : 'text-[#777]'}`}>Nike</div>
      </Link>
      <Link href='/converse'>
        <div className={`font-bold capitalize ${router.pathname === '/converse' ? 'text-black' : 'text-[#777]'}`}>Converse</div>
      </Link>
      <Link href='/sale-off'>
        <div className={`font-bold capitalize ${router.pathname === '/sale-off' ? 'text-black' : 'text-[#777]'}`}>Sale off</div>
      </Link>
    </div>
  )
}

export default NavBarResponsive
