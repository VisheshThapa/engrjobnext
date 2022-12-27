import HeaderResponsive from "./HeaderResponsive"

export default function Layout({ children, props}:{children:any,props:any}) {
  return (
    <>
      <HeaderResponsive/>
      <main {...props}>{children}</main>
    </>
  )
}