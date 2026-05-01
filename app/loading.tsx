import VelvetLoader from '@/components/VelvetLoader'

export default function Loading() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <VelvetLoader size='lg'/>
    </div>
  )
}