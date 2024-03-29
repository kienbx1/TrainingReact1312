export const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
export const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const ADMIN = 'admin'
export const DEFAULT_IMAGE = '/Images/no_img_avaliable.jpg'
export const SHIP_FEE = 30000
export const CAL_PRICE = (price, discount) => {
  return price - price * discount / 100
}
export const DEFAULT_BANNER = '/Images/Banner_tag/banner.jpg'
