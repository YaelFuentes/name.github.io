import Lottie from 'react-lottie';
import React from 'react'
import animationData from '../LottieFiles/animation_llzbu7i0.json'


export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <div role="status">
          <Lottie options={defaultOptions} height={200} width={200} />
          <h2 className='text-center text-4xl font-bold'>Cargando</h2>
        </div>
      </ul>
    </div>
  );
}