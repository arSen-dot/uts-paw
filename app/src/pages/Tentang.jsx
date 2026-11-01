import mahasiswa from '../../mahasiswa.json'

export default function Tentang() {
  const nama = mahasiswa.nama ?? mahasiswa.name
  const nim = mahasiswa.nim ?? mahasiswa.studentId ?? mahasiswa.NIM
  return (
    <section>
      <h1>Tentang</h1>
      <p>Nama: {nama}</p>
      <p>NIM: {nim}</p>
    </section>
  )
}
