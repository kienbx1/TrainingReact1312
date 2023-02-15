import ProductItem from './ProductItem'

const ProductList = (props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-5 pb-12 pt-5'>
      {
      props?.data?.length === 0
        ? (
          <p>Hiện chưa có sản phẩm nào</p>
          )
        : props?.data?.map(item => {
          return (
            <ProductItem item={item} key={item?.id} />
          )
        })
      }
    </div>
  )
}

export default ProductList
