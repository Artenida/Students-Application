import React from 'react';
import empty from '../../assets/empty1.jpg';

interface EmptyComponentProps {
  firstMessage?: string;
  secondMessage?: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({ firstMessage, secondMessage }) => {
  return (
    <div className="flex justify-center items-center flex-col mb-20 mt-8">
      <img src={empty} alt="Empty" className="h-80 md:h-96 lg:h-[500px]" />
      <h1 className="text-custom-color3 font-bold text-3xl text-center px-4 mt-4">
        {firstMessage}
      </h1>
      <h2 className="text-custom-color3 font-semibold text-2xl text-center px-4 mt-2">
        {secondMessage}
      </h2>
    </div>
  );
};

export default EmptyComponent;
