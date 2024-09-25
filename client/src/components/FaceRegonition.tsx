import { toast } from 'react-toastify';
import { useMyContext } from '../context/context';
import { error } from 'console';

const FaceRegonition = () => {
  const {
    imageUrl,
    boxDimensions,
    handleImageError,
    handleImageLoad,
    imageLoaded,
  } = useMyContext();

  return (
    imageUrl && (
      <div className="relative max-w-96 mx-auto">
        <img
          src={imageUrl}
          alt="face img"
          width="500px"
          height={imageUrl ? 'auto' : '300px'}
          id="inputImage"
          className="my-6 w-full block"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            display: imageLoaded ? 'block' : 'none',
          }}
        />
        {!imageLoaded &&
          error &&
          toast.error(error, { position: 'top-center' })}

        {boxDimensions.map((box, i) => {
          const { top, bottom, left, right } = box;
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: top,
                right: right,
                bottom: bottom,
                left: left,
              }}
            ></div>
          );
        })}
      </div>
    )
  );
};

export default FaceRegonition;
