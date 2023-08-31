import { Player } from '@lottiefiles/react-lottie-player';

export default function Loading() {
  return (
    <div>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <div role="status">
          <Player
            autoplay
            loop
            priority
            sizes='(max-width:768px) 100vw,
              (max-width:1200px) 50vm, 50vw'
            src={require('../LottieFiles/animation_llzbu7i0.json')}
            className='w-full h-auto'
          />
          <h2 className='text-center text-4xl font-bold'>Cargando</h2>
        </div>
      </ul>
    </div>
  )
}