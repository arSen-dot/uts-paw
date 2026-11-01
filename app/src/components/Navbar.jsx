import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar" id="navigasi">
      <span className="brand">Portofolio Proyek Pribadi</span>
      <ul>
        <li>
          <NavLink to="/koleksi">Koleksi</NavLink>
        </li>
        <li>
          <NavLink to="/tambah">Tambah</NavLink>
        </li>
        <li>
          <NavLink to="/statistik">Statistik</NavLink>
        </li>
        <li>
          <NavLink to="/tentang">Tentang</NavLink>
        </li>
      </ul>
    </nav>
  )
}
