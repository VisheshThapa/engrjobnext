import HeaderResponsive from "./HeaderResponsive"

export default function Layout({ children }) {
  return (
    <>
      <HeaderResponsive/>
      <main>{children}</main>
    </>
  )
}