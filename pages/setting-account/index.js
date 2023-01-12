import UserLayout from '../../components/layouts/UserLayout'

const SettingAccount = () => {
  return <h1>SettingAccount</h1>
}

SettingAccount.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default SettingAccount
