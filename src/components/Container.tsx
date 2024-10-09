import { cn } from '@/lib/utils';

type ContainerProps = React.ComponentProps<'div'>;

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div {...props} className={cn('max-w-7xl mx-auto px-5', className)}>
      {children}
    </div>
  );
};

export default Container;
