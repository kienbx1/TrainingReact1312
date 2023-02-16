import Skeleton from 'react-loading-skeleton'

const Loading = () => {
  return (
    <div>
      <Skeleton height={52} style={{ marginTop: 22 }} />
      <Skeleton height={52} style={{ marginTop: 10, marginBottom: 22 }} />
      <Skeleton height={24} count={12} style={{ marginTop: 4 }} />
      <Skeleton height={24} width='50%' style={{ marginTop: 14 }} />
    </div>
  )
}

export default Loading
