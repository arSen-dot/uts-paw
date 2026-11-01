import { useNavigate } from 'react-router-dom'
import ProyekForm from '../components/ProyekForm.jsx'
import { useKoleksiContext } from '../context/KoleksiContext.jsx'

export default function Tambah() {
  const { addItem } = useKoleksiContext()
  const navigate = useNavigate()

  function handleSubmit(data) {
    addItem(data)
    navigate('/koleksi')
  }

  return (
    <section>
      <h1>Tambah Proyek</h1>
      <ProyekForm onSubmit={handleSubmit} />
    </section>
  )
}
