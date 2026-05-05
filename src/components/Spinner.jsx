import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Spinner = ({ loading }) => {
  return (
    <div
      id="spinner"
      className={`${loading ? 'show' : ''} bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex flex-column align-items-center justify-content-center`}
    >
      <DotLottieReact
        src="https://lottie.host/4643ff65-e436-4c8d-a5bb-0e9dc064be82/e4XhTrBkVo.lottie"
        loop
        autoplay
        style={{ width: '150px', height: '150px' }}
      />
      <img 
        src="/two%20colors.png" 
        alt="Bark Tech" 
        style={{ width: '150px', marginTop: '10px' }} 
      />
    </div>
  );
};

export default Spinner;
