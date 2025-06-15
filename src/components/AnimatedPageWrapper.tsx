
import { useEffect, useRef } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedPageWrapper = ({ children, className = "" }: AnimatedPageWrapperProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { pageTransition } = useGSAPAnimations();

  useEffect(() => {
    if (pageRef.current) {
      pageTransition(pageRef.current);
    }
  }, [pageTransition]);

  return (
    <div ref={pageRef} className={className}>
      {children}
    </div>
  );
};
