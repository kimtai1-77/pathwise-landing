import './Btn.css';

const Btn = ({
  as: Component = 'a',
  children,
  className = '',
  variant = '',
  ...props
}) => {
  const classes = ['btn', variant ? `btn-${variant}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Btn;
