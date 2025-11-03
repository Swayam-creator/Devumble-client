
const ResponsiveImage = ({ src, alt, className, sizes }) => {

  const srcSet = `
    ${src}?w=96 96w,
    ${src}?w=200 200w,
    ${src}?w=400 400w,
    ${src}?w=800 800w
  `;

  return (
    <img
      src={`${src}?w=400`} 
      srcSet={srcSet}
      sizes={sizes || "(max-width: 768px) 96px, 200px"}
      alt={alt}
      className={className + "w-full h-full object-cover"}
      loading="lazy"
      decoding="async"
    />
  );
};
export default ResponsiveImage;