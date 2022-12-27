import HeaderResponsive from "./HeaderResponsive"

export default function Layout({ children}:{children:any}) {
  return (
    <>
      <HeaderResponsive/>
      <main >{children}</main>
    </>
  )
}