import React from 'react';
import { cn } from '../../lib/utils';
import camplyMark from '../../assets/camply-mark.png';

interface CamplyMarkProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const CamplyMark: React.FC<CamplyMarkProps> = ({
  alt = 'Camply',
  className,
  ...props
}) => (
  <img
    src={camplyMark}
    alt={alt}
    className={cn('block h-auto w-full object-contain', className)}
    {...props}
  />
);
