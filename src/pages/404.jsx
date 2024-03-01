import BlankLayout from 'src/layout/BlankLayout'

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Error 404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
    </div>
  )
}
Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error404
