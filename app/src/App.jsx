import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import { KoleksiProvider } from './context/KoleksiContext.jsx'
import Detail from './pages/Detail.jsx'
import Koleksi from './pages/Koleksi.jsx'
import NotFound from './pages/NotFound.jsx'
import Statistik from './pages/Statistik.jsx'
import Tambah from './pages/Tambah.jsx'
import Tentang from './pages/Tentang.jsx'

export default function App() {
  return (
    <KoleksiProvider>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/koleksi" replace />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/koleksi/:id" element={<Detail />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </KoleksiProvider>
  )
}
