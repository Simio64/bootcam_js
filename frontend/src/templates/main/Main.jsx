import SidePanel from '../../components/aside/Aside.jsx'
import './Main.css'

// eslint-disable-next-line react/prop-types
function Main ({children}) {
    return(
      <main id='principal_page'>
        <SidePanel/>
        <section>
          {children}
        </section>
      </main>
    )
}
export default Main